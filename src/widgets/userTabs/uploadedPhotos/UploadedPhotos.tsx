import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'

import { ImagePost } from '@/src/queries/types'
import { useGetPostsByUserQuery } from '@/src/queries/user/getPostsByUse/getPostsByUse.generated'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './uploadedPhotos.module.scss'

type Props = { userId: number }

export const UploadedPhotos = ({ userId }: Props) => {
  const { inView, ref } = useInView({ threshold: 0.1 })
  const dispatch = useDispatch()

  const { data, loading, error, fetchMore } = useGetPostsByUserQuery({
    variables: { userId },
    notifyOnNetworkStatusChange: true,
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
        variables: { userId, endCursorId },
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

  return (
    <>
      <Posts posts={allPosts} />
      {hasMore && (
        <div className={s.loadMore} ref={ref}>
          <Typography option={'bold_text16'}>Loading...</Typography>
        </div>
      )}
    </>
  )
}
