'use client'

import { ArrowBackOutline } from '@/src/shared/assets/componentsIcons'
import { UserTabs } from '@/src/widgets/userTabs/UserTabs'
import { UserInfo } from '@/src/widgets/userTabs/userInfo/UserInfo'
import { Typography } from '@tehnoroboty/ui-kit'
import { useParams } from 'next/navigation'

import s from './showUser.module.scss'

export const ShowUser = () => {
  const params = useParams<{ userId: string }>()
  const userId = Number(params?.userId)

  return (
    <div className={s.page}>
      <div className={s.header}>
        <Typography as={'a'} className={s.button} href={'/users-list'} option={'medium_text14'}>
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
