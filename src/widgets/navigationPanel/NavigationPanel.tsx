// @flow
'use client'
import * as React from 'react'

import {
  CreditCard,
  CreditCardOutline,
  Image,
  ImageOutline,
  Person,
  PersonOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { useAuth } from '@/src/shared/hooks/useAuth'
import { MenuMobile } from '@/src/widgets/navigationPanel/menuMobile/MenuMobile'
import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'
import { MenuItemType } from '@/src/widgets/navigationPanel/types'

export const NavigationPanel = () => {
  const isAuth = useAuth()

  if (!isAuth) {
    return null
  }

  const menuItems: MenuItemType[] = [
    {
      href: '/users-list',
      icon: PersonOutline,
      iconActive: Person,
      title: 'Users List',
    },
    {
      href: '/statistics',
      icon: TrendingUpOutline,
      iconActive: TrendingUp,
      title: 'Statistics',
    },
    {
      href: 'payments-list',
      icon: CreditCardOutline,
      iconActive: CreditCard,
      title: 'Payments list',
    },
    {
      href: '/posts-list',
      icon: ImageOutline,
      iconActive: Image,
      title: 'Posts list',
    },
  ]

  return (
    <>
      <MenuMobile items={menuItems} />
      <Sidebar items={menuItems} />
    </>
  )
}
