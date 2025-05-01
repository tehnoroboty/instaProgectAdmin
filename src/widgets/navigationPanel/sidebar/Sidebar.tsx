'use client'
import React from 'react'

import { MenuSection } from '@/src/widgets/navigationPanel/sidebar/menuSection/MenuSection'
import { MenuItemType } from '@/src/widgets/navigationPanel/types'

import s from './sidebar.module.scss'

type Props = {
  items: MenuItemType[]
}

const Sidebar = ({ items }: Props) => {
  return (
    <aside className={s.sidebar}>
      <nav className={s.container}>
        {items && <MenuSection className={s.menuItems} items={items} />}
      </nav>
    </aside>
  )
}

export default Sidebar
