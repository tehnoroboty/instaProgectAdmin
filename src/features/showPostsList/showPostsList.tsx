'use client'

import s from './showPostsList.module.scss'
import {Input, Loader, Typography} from "@tehnoroboty/ui-kit";
import type {QueryGetPostsArgs} from "@/src/queries/types";
import {useGetPostsQuery} from "@/src/queries/posts/getPosts.generated";
import {PostsGrid} from "@/src/widgets/postsGrid/postsGrid";
import {useEffect, useState} from "react";
import {setAppError} from "@/src/shared/model/slices/appSlice";
import {useAppDispatch} from "@/src/shared/model/store/store";
import {PostType} from "@/src/widgets/post/post";
import {useInView} from "react-intersection-observer";
import clsx from "clsx";

const POSTS_PER_PAGE = 8

export const ShowPostsList = () => {
    const {inView, ref} = useInView({threshold: 0.1})
    const [posts, setPosts] = useState<PostType[]>([]);
    const [endCursorPostId, setEndCursorPostId] = useState<number>(0);
    const variables: QueryGetPostsArgs = {endCursorPostId: endCursorPostId, pageSize: POSTS_PER_PAGE}
    const dispatch = useAppDispatch()

    const {data, error, loading, refetch} = useGetPostsQuery({variables})

    const hasMorePosts = (data?.getPosts.totalCount as number) > (data?.getPosts.pagesCount as number)

    useEffect(() => {
        if (hasMorePosts && inView) {
            setEndCursorPostId(posts[posts.length - 1].id)
        }
    }, [inView, hasMorePosts, dispatch, posts])

    useEffect(() => {
        if (error) {
            const errorMessage = error.message

            dispatch(setAppError({error: errorMessage}))
        }
    }, [error, dispatch])

    useEffect(() => {
        if (data) {
            if (data.getPosts) {
                // @ts-ignore
                setPosts((prevState) => {
                    return [...prevState, ...data.getPosts.items]
                })
            } else {
                setPosts([])
            }

        }
    }, [data])
    return (
        <div className = {s.container}>
            <Input
                className = {s.searchInput}
                // onInput = {handleInputChange}
                placeholder = {'Search'}
                type = {'search'}
            />

            {posts && <>
                <PostsGrid posts = {posts}/>
                {
                    hasMorePosts && (
                        <div className = {s.loadMore} ref = {ref}>
                            <Typography option = {'bold_text16'}>Loading...</Typography>
                        </div>)
                }
            </>}
            {loading && (
                <div className = {clsx(s.loading, posts && s.loadingWithoutPosts)}>
                    <Loader color = {'#4C8DFF'} size = {20}/>
                </div>
            )}
        </div>
    )
}
