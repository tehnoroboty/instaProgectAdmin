import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'
import { MenuItemType } from '@/src/widgets/navigationPanel/types'

const meta = {
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const menuItemsMock: MenuItemType[] = [
  {
    href: '/users-list',
    icon: () => null,
    iconActive: () => null,
    title: 'Users List',
  },
  {
    href: '/statistics',
    icon: () => null,
    iconActive: () => null,
    title: 'Statistics',
  },
  {
    href: 'payments-list',
    icon: () => null,
    iconActive: () => null,
    title: 'Payments list',
  },
  {
    href: '/posts-list',
    icon: () => null,
    iconActive: () => null,
    title: 'Posts list',
  },
]

export const Primary: Story = {
  args: {
    items: menuItemsMock,
  },
}
