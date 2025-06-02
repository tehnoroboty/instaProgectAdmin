type Props = {
  userId: number
}

const USERS_PER_PAGE = 10

export const Following = ({ userId }: Props) => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })

  return <div>Following</div>
}
