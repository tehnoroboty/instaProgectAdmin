import {
  Block,
  MoreHorizontalOutline,
  PersonRemoveOutline,
  Unblock,
} from '@/src/shared/assets/componentsIcons'
import { Dropdown, DropdownMenuItems } from '@/src/shared/ui/dropdown/Dropdown'

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
      icon: isBanned ? Unblock : Block,
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
