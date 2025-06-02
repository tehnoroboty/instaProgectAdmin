'use client'

import { useGetUserQuery } from '@/src/queries/user/getUser/getUser.generated'
import { ArrowBackOutline } from '@/src/shared/assets/componentsIcons'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserTabs } from '@/src/widgets/userTabs/UserTabs'
import { UserInfo } from '@/src/widgets/userTabs/userInfo/UserInfo'
import { useParams } from 'next/navigation'

import s from './showUser.module.scss'

export const ShowUser = () => {
  const params = useParams<{ userId: string }>()
  const userId = Number(params?.userId)

  return (
    <div className={s.page}>
      <div className={s.header}>
        <Typography className={s.button} option={'medium_text14'} as={'a'} href={'/users-list'}>
          <ArrowBackOutline />
          Back to Users List
        </Typography>
      </div>
      <div className={s.xxx}>
        <UserInfo userId={userId} />
      </div>
      <UserTabs userId={userId} />
    </div>
  )
}
