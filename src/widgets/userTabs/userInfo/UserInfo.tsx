import { useDispatch } from 'react-redux'

import { useGetUserQuery } from '@/src/queries/user/getUser/getUser.generated'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ApolloError } from '@apollo/client'
import { format } from 'date-fns'

import s from './userInfo.module.scss'

type Props = {
  userId: number
}

export const UserInfo = ({ userId }: Props) => {
  const dispatch = useDispatch()

  const { data, loading, error } = useGetUserQuery({
    variables: { userId },
  })

  if (loading) {
    return (
      <div className={s.loading}>
        <Loader color={'#4C8DFF'} size={20} />
      </div>
    )
  }

  if (error || !data?.getUser) {
    const errorMessage = error instanceof ApolloError ? error.message : 'Unknown error'

    dispatch(setAppError({ error: errorMessage }))

    return null
  }

  const user = data.getUser

  const { id, userName, email, createdAt, profile } = user
  const avatarUrl = profile?.avatars?.[0]?.url ?? ''

  const createdAtDate = makeLocaleDate(createdAt)

  const firstName = profile?.firstName
  const lastName = profile?.lastName
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : userName

  return (
    <div>
      <div className={s.top}>
        <AvatarBox src={avatarUrl} size={'m'} />
        <div className={s.info}>
          <Typography as={'h1'} option={'h1'}>
            {displayName}
          </Typography>
          <Typography
            as={'a'}
            className={s.link}
            href={`/users-list/${userId}`}
            option={'regular_link'}
          >
            {email}
          </Typography>
        </div>
      </div>
      <div className={s.extraData}>
        <div className={s.box}>
          <Typography className={s.title} option={'regular_text14'}>
            UserID
          </Typography>
          <Typography as={'h1'} option={'regular_text16'}>
            {id}
          </Typography>
        </div>
        <div className={s.box}>
          <Typography className={s.title} option={'regular_text14'}>
            Profile Creation Date
          </Typography>
          <Typography as={'h1'} option={'regular_text16'}>
            {createdAtDate}
          </Typography>
        </div>
      </div>
    </div>
  )
}
