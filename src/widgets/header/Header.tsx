'use client'

import { ComponentPropsWithoutRef } from 'react'
// import { useMeQuery } from '@/src/shared/model/api/authApi'
// import { HeaderMobile } from '@/src/widgets/header/headerMobile/HeaderMobile'
import { HeaderWeb } from '@/src/widgets/header/headerWeb/HeaderWeb'

import s from './header.module.scss'

type Props = {
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { notification, title, ...rest } = props

  return (
    <header {...rest} className={s.header}>
      {/*<HeaderMobile title={title} />*/}
      <HeaderWeb title={title} />
    </header>
  )
}
