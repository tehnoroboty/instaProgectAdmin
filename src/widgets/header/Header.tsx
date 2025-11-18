'use client'

import { ComponentPropsWithoutRef } from 'react'

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
      <HeaderWeb title={title} />
    </header>
  )
}
