import { Posts } from '@/src/shared/ui/postsGrid/Posts'

type Props = { postsData: any }

export const UploadedPhotos = ({ postsData }: Props) => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })

  return <div>{!postsData ? <div>Пусто</div> : <Posts posts={postsData} />}</div>
}
