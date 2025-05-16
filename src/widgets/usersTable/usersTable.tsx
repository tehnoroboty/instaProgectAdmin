import type { TableUser } from '@/src/shared/types/types'

import { useState } from 'react'

import { ConfirmationModal } from '@/src/features/modals/сonfirmationModal/ConfirmationModal'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser.generated'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { UsersListDropdown } from '@/src/widgets/UsersListDropdown/UsersListDropdown'

type Props = {
  data: TableUser[]
  refetch: () => void
}

export const UsersTable = ({ data, refetch }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBanModal, setShowBanModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [deleteUser, { loading }] = useRemoveUserMutation()

  const handleBanUser = (user: TableUser) => {
    setSelectedUser(user)
    setShowBanModal(true)
  }
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
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.profileLink}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <UsersListDropdown
                  onBanUser={() => handleBanUser(item)}
                  onDeleteUser={() => handleDeleteUser(item)}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
