import type { TableUser } from '@/src/shared/types/types'

import { useState } from 'react'

import { ConfirmationModal } from '@/src/features/modals/сonfirmationModal/ConfirmationModal'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser.generated'
import { Block } from '@/src/shared/assets/componentsIcons'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { DropdownTable } from '@/src/widgets/dropdownTable/dropdownTable'

import s from './usersTable.module.scss'

type Props = {
  data: TableUser[]
  refetch: () => void
}

export const UsersTable = ({ data, refetch }: Props) => {
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, { loading }] = useRemoveUserMutation()

  const handleDeleteUser = (user: TableUser) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const onDeleteUser = async () => {
    try {
      if (!selectedUser) {
        return
      }
      await deleteUser({ variables: { id: parseInt(selectedUser.id, 10) } })
      setSelectedUser(null)
      refetch()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  if (showDeleteModal && selectedUser) {
    return (
      <ConfirmationModal
        loading={loading}
        modalMessage={`Are you sure you want to delete ${selectedUser.userName}?`}
        modalTitle={'Delete user'}
        onClickNo={() => setShowDeleteModal(false)}
        onCloseModal={() => setShowDeleteModal(false)}
        onCloseParentModal={onDeleteUser}
        open={showDeleteModal}
      />
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Profile link</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className={s.idCell}>
                <div className={s.flexContainer}>
                  {item.isBlocked && <Block className={s.blockIcon} />}
                  <span className={item.isBlocked ? '' : s.idWithoutIcon}>{item.id}</span>
                </div>
              </TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.profileLink}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <DropdownTable
                  isBanned={item.isBlocked}
                  onBanEdit={() => {}}
                  onDelete={() => handleDeleteUser(item)}
                  onView={() => {}}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
