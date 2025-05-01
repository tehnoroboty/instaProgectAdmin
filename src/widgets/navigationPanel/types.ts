import * as React from 'react'

export type MenuItemType = {
  href?: string
  icon: React.ComponentType
  iconActive?: React.ComponentType
  onClick?: () => void
  title: string
}
