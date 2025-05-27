import PersonBan from '@/src/shared/assets/componentsIcons/Block'
import PersonRemove from '@/src/shared/assets/componentsIcons/PersonRemove'
import { Dropdown, DropdownMenuItems } from '@/src/shared/ui/dropdown/Dropdown'

type Props = {
  onBanUser?: () => void
  onDeleteUser?: () => void
}

export const UsersListDropdown = ({ onBanUser, onDeleteUser }: Props) => {
  const menuItems: DropdownMenuItems[] = [
    {
      icon: PersonRemove,
      id: '1',
      onClick: onDeleteUser,
      title: 'Delete User',
    },
    {
      icon: PersonBan,
      id: '2',
      onClick: onBanUser,
      title: 'Ban in the system',
    },
  ]

  return (
    <div>
      <Dropdown list={menuItems} />
    </div>
  )
}
