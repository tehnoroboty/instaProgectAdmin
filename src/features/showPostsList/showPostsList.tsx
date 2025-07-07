'use client'

import type {QueryGetPostsArgs} from '@/src/queries/types'

import {type ChangeEvent, useEffect, useMemo, useState} from 'react'
import {useInView} from 'react-intersection-observer'

import {usePostAddedSubscription} from '@/src/queries/postAddSubscription/postAdded.generated'
import {useGetPostsQuery} from '@/src/queries/posts/getPosts.generated'
import {useBanUserMutation} from '@/src/queries/user/banUser/banUser.generated'
import {useUnbanUserMutation} from '@/src/queries/user/unbanUser/unbanUser.generated'
import {DEFAULT_BAN_REASON, SELECT_REASON} from '@/src/shared/lib/constants/select'
import {setAppError} from '@/src/shared/model/slices/appSlice'
import {useAppDispatch} from '@/src/shared/model/store/store'
import {BanReason, UserModalType} from '@/src/shared/types/types'
import {PostType} from '@/src/widgets/post/post'
import {PostsGrid} from '@/src/widgets/postsGrid/postsGrid'
import {ConfirmationModal} from '@/src/widgets/сonfirmationModal/ConfirmationModal'
import {ApolloError} from '@apollo/client'
import {Input, Loader, SelectBox, Typography} from '@tehnoroboty/ui-kit'
import clsx from 'clsx'
import debounce from 'lodash/debounce'

import s from './showPostsList.module.scss'

const POSTS_PER_PAGE = 8

export const ShowPostsList = () => {
    const {inView, ref} = useInView({threshold: 0.1})
    const [posts, setPosts] = useState<PostType[]>([])
    const [endCursorPostId, setEndCursorPostId] = useState<number>(0)
    const [activeModal, setActiveModal] = useState<UserModalType>(null)
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null)
    const [banReason, setBanReason] = useState<BanReason>(DEFAULT_BAN_REASON)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const variables: QueryGetPostsArgs = {
        endCursorPostId: endCursorPostId,
        pageSize: POSTS_PER_PAGE,
        searchTerm: searchTerm,
    }
    const dispatch = useAppDispatch()

    const {data, error, loading} = useGetPostsQuery({variables})
    const {data: newPost, error: errorNewPost} = usePostAddedSubscription()
    const [banUser, {loading: banLoading}] = useBanUserMutation()
    const [unbanUser, {loading: unbanLoading}] = useUnbanUserMutation()

    const openModal = (type: UserModalType, post: PostType) => {
        setSelectedPost(post)
        setActiveModal(type)
    }

    const handleSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchTerm(value)
                setEndCursorPostId(0)
                setPosts([])
            }, 500),
        []
    )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target

        handleSearch(value)
    }

    const handleCloseModal = () => {
        if (activeModal === 'ban') {
            setBanReason(DEFAULT_BAN_REASON)
        }
        setActiveModal(null)
    }

    const handleChoseReasonChange = (value: string) => {
        const options = SELECT_REASON.find(r => r.valueTitle === value)

        if (options) {
            setBanReason(options.value as BanReason)
        }
    }

    const onBanUser = async () => {
        try {
            if (!selectedPost || !banReason.trim()) {
                return
            }
            await banUser({
                variables: {
                    banReason: banReason.trim(),
                    userId: parseInt(selectedPost.ownerId.toString(), 10),
                },
            })
            setPosts(
                posts.map(post =>
                    post.ownerId === selectedPost.ownerId
                        ? {
                            ...post,
                            userBan: {createdAt: new Date(), reason: banReason},
                        }
                        : post
                )
            )
            setSelectedPost(null)
            setBanReason(DEFAULT_BAN_REASON)
            setActiveModal(null)
        } catch (err) {
            const error = err as ApolloError

            dispatch(setAppError({error: error.message}))
        }
    }

    const onUnbanUser = async () => {
        if (!selectedPost) {
            return
        }
        try {
            await unbanUser({variables: {id: parseInt(selectedPost.ownerId.toString(), 10)}})
            setPosts(
                posts.map(post =>
                    post.ownerId === selectedPost.ownerId ? {...post, userBan: null} : post
                )
            )
            setSelectedPost(null)
        } catch (err) {
            const error = err as ApolloError

            dispatch(setAppError({error: error.message}))
        }
    }

    useEffect(() => {
        if (newPost?.postAdded) {
            setPosts((prevPosts: PostType[]) => [newPost.postAdded as PostType, ...prevPosts])
        }
    }, [newPost])

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
        if (errorNewPost) {
            const errorMessage = errorNewPost.message

            dispatch(setAppError({error: errorMessage}))
        }
    }, [errorNewPost, dispatch])

    useEffect(() => {
        if (data) {
            if (data.getPosts) {
                setPosts((prevState: PostType[]) => {
                    return [...prevState, ...data.getPosts.items] as PostType[]
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
                onInput = {handleInputChange}
                placeholder = {'Search'}
                type = {'search'}
            />

            {posts && (
                <>
                    <PostsGrid openModal = {openModal} posts = {posts}/>
                    {hasMorePosts && <div className = {s.loadMore} ref = {ref}></div>}
                </>
            )}
            {loading && (
                <div className = {clsx(s.loading, posts && s.loadingWithoutPosts)}>
                    <Loader color = {'#4C8DFF'} size = {20}/>
                </div>
            )}
            {activeModal === 'ban' && selectedPost && (
                <ConfirmationModal
                    loading = {banLoading}
                    modalMessage = {
                        <>
                            Are you sure want to ban this user,{' '}
                            <Typography as = {'span'} option = {'bold_text16'}>
                                {selectedPost.postOwner.userName}
                            </Typography>
                            ?
                            <SelectBox
                                className = {s.selectBox}
                                onChangeValue = {handleChoseReasonChange}
                                options = {SELECT_REASON}
                                placeholder = {'Reason for ban'}
                            />
                        </>
                    }
                    modalTitle = {'Ban user'}
                    onClickNo = {handleCloseModal}
                    onCloseModal = {handleCloseModal}
                    onCloseParentModal = {onBanUser}
                    open = {activeModal === 'ban'}
                />
            )}
            {activeModal === 'unban' && selectedPost && (
                <ConfirmationModal
                    loading = {unbanLoading}
                    modalMessage = {
                        <>
                            Are you sure want to un-ban{' '}
                            <Typography as = {'span'} option = {'bold_text16'}>
                                {selectedPost.postOwner.userName}
                            </Typography>
                            ?
                        </>
                    }
                    modalTitle = {'Un-ban user'}
                    onClickNo = {handleCloseModal}
                    onCloseModal = {handleCloseModal}
                    onCloseParentModal = {onUnbanUser}
                    open = {activeModal === 'unban'}
                />
            )}
        </div>
    )
}
