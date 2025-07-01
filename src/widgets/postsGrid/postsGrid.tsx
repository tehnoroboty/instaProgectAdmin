import { UserModalType } from '@/src/shared/types/types'
import { Post, PostType } from '@/src/widgets/post/post'

import s from './postsGrid.module.scss'

type Props = {
  openModal: (type: UserModalType, post: PostType) => void
  posts: PostType[]
}

export const PostsGrid = ({ openModal, posts }: Props) => {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className={s.container}>
      <div>
        <div className={s.postsContainer}>
          {posts?.map(post => post.id && <Post key={post.id} openModal={openModal} post={post} />)}
        </div>
      </div>
    </div>
  )
}
