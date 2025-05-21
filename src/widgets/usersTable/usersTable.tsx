import type { TableUser } from '@/src/shared/types/types'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useRemoveUserMutation } from '@/src/queries/user/removeUser.generated'
import { Block } from '@/src/shared/assets/componentsIcons'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { DropdownTable } from '@/src/widgets/dropdownTable/dropdownTable'
import { ConfirmationModal } from '@/src/widgets/сonfirmationModal/ConfirmationModal'
import { ApolloError } from '@apollo/client'

import s from './usersTable.module.scss'

type Props = {
  data: TableUser[]
  refetch: () => void
}

export const UsersTable = ({ data, refetch }: Props) => {
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, { loading }] = useRemoveUserMutation()
  const dispatch = useDispatch()
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
      const error = err as ApolloError

      dispatch(setAppError({ error: error.message }))
    }
  }

  return (
    <>
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
      {showDeleteModal && selectedUser && (
        <ConfirmationModal
          loading={loading}
          modalMessage={`Are you sure you want to delete ${selectedUser.profileLink}?`}
          modalTitle={'Delete user'}
          onClickNo={() => setShowDeleteModal(false)}
          onCloseModal={() => setShowDeleteModal(false)}
          onCloseParentModal={onDeleteUser}
          open={showDeleteModal}
        />
      )}
    </>
  )
}
