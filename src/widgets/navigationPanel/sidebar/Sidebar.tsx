'use client'
import React from 'react'

import { MenuSection } from '@/src/widgets/navigationPanel/sidebar/menuSection/MenuSection'
import { MenuItemType } from '@/src/widgets/navigationPanel/types'

import s from './sidebar.module.scss'

type Props = {
  items: MenuItemType[]
}

const Sidebar = ({ items }: Props) => {
  const topItems = items.slice(0, -1)
  const bottomItem = items[items.length - 1]

  return (
    <aside className={s.sidebar}>
      <nav className={s.container}>
        {topItems.length > 0 && <MenuSection className={s.menuItems} items={topItems} />}

        <div className={s.bottomItem}>
          <MenuSection items={[bottomItem]} />
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
