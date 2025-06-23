import type { PostType } from '@/src/shared/types/types'

import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'

import { ImagePost } from '@/src/queries/types'
import { useGetPostsByUserQuery } from '@/src/queries/user/getPostsByUse/getPostsByUse.generated'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Loader, Posts, Typography } from '@tehnoroboty/ui-kit'

import s from './uploadedPhotos.module.scss'

type Props = { userId: number }

export const UploadedPhotos = ({ userId }: Props) => {
  const { inView, ref } = useInView({ threshold: 0.1 })
  const dispatch = useDispatch()

  const { data, error, fetchMore, loading } = useGetPostsByUserQuery({
    notifyOnNetworkStatusChange: true,
    variables: { userId },
  })

  const [allPosts, setAllPosts] = useState<ImagePost[]>([])

  const totalCount = data?.getPostsByUser.totalCount ?? 0
  const initialPosts = useMemo(() => data?.getPostsByUser.items ?? [], [data])

  useEffect(() => {
    if (initialPosts.length) {
      setAllPosts(initialPosts)
    }
  }, [initialPosts])

  const endCursorId = allPosts.length ? allPosts[allPosts.length - 1].id : null
  const hasMore = allPosts.length < totalCount

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  useEffect(() => {
    if (inView && hasMore && !loading && endCursorId) {
      fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          const newItems = fetchMoreResult?.getPostsByUser?.items || []

          if (!newItems.length) {
            return prev
          }

          const mergedItems = [
            ...(prev.getPostsByUser.items || []),
            ...newItems.filter(
              newItem =>
                !(prev.getPostsByUser.items || []).some(prevItem => prevItem.id === newItem.id)
            ),
          ]

          // обновляем локальный state
          setAllPosts(mergedItems)

          return {
            getPostsByUser: {
              ...fetchMoreResult.getPostsByUser,
              items: mergedItems,
            },
          }
        },
        variables: { endCursorId, userId },
      }).catch(err => {
        dispatch(setAppError({ error: err }))
      })
    }
  }, [inView, endCursorId, hasMore, loading, fetchMore, userId, dispatch])

  if (loading && !allPosts.length) {
    return (
      <div className={s.loading}>
        <Loader color={'#4C8DFF'} size={20} />
      </div>
    )
  }

  if (!allPosts.length) {
    return <div className={s.noText}>No posts found</div>
  }
  const adaptedPosts: PostType[] = allPosts.map(post => ({
    id: post.id ?? Math.random(),
    images: post.url
      ? [
          {
            height: post.height ?? undefined,
            url: post.url,
            width: post.width ?? undefined,
          },
        ]
      : [],
  }))

  return (
    <>
      <Posts posts={adaptedPosts} />
      {hasMore && (
        <div className={s.loadMore} ref={ref}>
          <Typography option={'bold_text16'}>Loading...</Typography>
        </div>
      )}
    </>
  )
}
