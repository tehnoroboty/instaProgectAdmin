import {
  Block,
  MoreHorizontalOutline,
  PersonRemoveOutline,
} from '@/src/shared/assets/componentsIcons'
import { Dropdown, type DropdownMenuItems } from '@tehnoroboty/ui-kit'

type Props = {
  className?: string
  isBanned: boolean
  onBanEdit: (isBanned: boolean) => void
  onDelete: () => void
  onView: () => void
}

export const DropdownTable = ({ className, isBanned, onBanEdit, onDelete, onView }: Props) => {
  const menuItems: DropdownMenuItems[] = [
    {
      icon: PersonRemoveOutline,
      id: '1',
      onClick: onDelete,
      title: 'Delete User',
    },
    {
      icon: Block,
      id: '2',
      onClick: () => onBanEdit(!isBanned),
      title: isBanned ? 'Un-ban User' : 'Ban in the system',
    },
    {
      icon: MoreHorizontalOutline,
      id: '3',
      onClick: onView,
      title: 'More Information',
    },
  ]

  return (
    <div className={className}>
      <Dropdown list={menuItems} />
    </div>
  )
}
