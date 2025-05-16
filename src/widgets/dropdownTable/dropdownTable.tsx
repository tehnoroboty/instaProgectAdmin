import { Dropdown, DropdownMenuItems } from '@/src/shared/ui/dropdown/Dropdown'
import {PersonRemoveOutline, Block, MoreHorizontalOutline } from '@/src/shared/assets/componentsIcons'

type Props = {
    className?: string
    isBanned: boolean
    onDelete: () => void
    onBanEdit: (isBanned: boolean) => void
    onView: () => void
}

export const DropdownTable = ({isBanned, className, onDelete, onBanEdit, onView }: Props) => {
    const menuItems: DropdownMenuItems[] = [
        {
            id: '1',
            icon: PersonRemoveOutline,
            title: 'Delete User',
            onClick: onDelete,
        },
        {
            id: '2',
            icon: Block,
            title: isBanned? 'Un-ban User' : 'Ban in the system',
            onClick: () => onBanEdit(!isBanned),
        },
        {
            id: '3',
            icon: MoreHorizontalOutline,
            title: 'More Information',
            onClick: onView,
        }
    ]
    return (
        <div className={className}>
            <Dropdown list={menuItems} />
        </div>
    )
}