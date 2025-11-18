// @flow
'use client'
import * as React from 'react'

import {
  CreditCard,
  CreditCardOutline,
  Image,
  ImageOutline,
  LogOutOutline,
  Person,
  PersonOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { useAuth } from '@/src/shared/hooks/useAuth'
import { clearAuth } from '@/src/shared/model/slices/authSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { MenuMobile } from '@/src/widgets/navigationPanel/menuMobile/MenuMobile'
import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'
import { MenuItemType } from '@/src/widgets/navigationPanel/types'

export const NavigationPanel = () => {
  const { authChecked, isAuth } = useAuth()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('authorization')
    dispatch(clearAuth())
  }

  if (!authChecked || !isAuth) {
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
    {
      icon: LogOutOutline,
      onClick: handleLogout,
      title: 'Log Out',
    },
  ]

  return (
    <>
      <MenuMobile items={menuItems} />
      <Sidebar items={menuItems} />
    </>
  )
}
