import {Posts} from "@/src/shared/ui/postsGrid/Posts";

type Props = {
}

export const UploadedPhotos = () => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })

  return (
    <div>
      {!postsDataForRender ? <div>Пусто</div> : <Posts posts={postsDataForRender} />}
    </div>
  )
}