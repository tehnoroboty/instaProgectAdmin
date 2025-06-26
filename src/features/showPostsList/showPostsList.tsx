'use client'

import s from './showPostsList.module.scss'
import {Input, Loader} from "@tehnoroboty/ui-kit";
import type {QueryGetPostsArgs} from "@/src/queries/types";
import {useGetPostsQuery} from "@/src/queries/posts/getPosts.generated";
import {PostsGrid} from "@/src/widgets/postsGrid/postsGrid";
import {useEffect, useState} from "react";
import {setAppError} from "@/src/shared/model/slices/appSlice";
import {useAppDispatch} from "@/src/shared/model/store/store";
import {PostType} from "@/src/widgets/post/post";

const POSTS_PER_PAGE = 8

export const ShowPostsList = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const variables: QueryGetPostsArgs = {endCursorPostId: 0, pageSize: POSTS_PER_PAGE}
    const dispatch = useAppDispatch()

    const {data, error, loading, refetch} = useGetPostsQuery({variables})

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
                setPosts(data.getPosts.items)
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
            {loading ? (
                <div className = {s.loading}>
                    <Loader color = {'#4C8DFF'} size = {20}/>
                </div>
            ) : (
                <PostsGrid posts = {posts}/>
            )}
        </div>
    )
}
