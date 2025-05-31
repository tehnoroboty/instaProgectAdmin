type Props = {
  userId: string
}

export const GeneralUserInfo = ({ userId }: Props) => {
  // здесь GraphQL или RTK-запрос на получение инфы
  // пример:
  // const { data, loading } = useGetUserByIdQuery({ id: userId })

  return (
    <div>
      <img src="/mock-avatar.jpg" alt="User avatar" />
      <p>Username: JohnDoe</p>
      <p>UserID: {userId}</p>
      <p>
        Profile link:{' '}
        <a href="https://public.profile.link" target="_blank" rel="noopener noreferrer">
          https://public.profile.link
        </a>
      </p>
      <p>Profile creation date: 2024-12-01</p>
    </div>
  )
}