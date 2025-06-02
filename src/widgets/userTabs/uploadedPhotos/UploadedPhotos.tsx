import { Posts } from '@/src/shared/ui/postsGrid/Posts'

import s from './uploadedPhotos.module.scss'

type Props = { userId: number }

export const UploadedPhotos = ({ userId }: Props) => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })
  const postsData: any = 0

  return (
    <div>
      <div className={s.title}>{userId}</div>
      {!postsData ? <div>Пусто</div> : <Posts posts={postsData} />}
    </div>
  )
}
