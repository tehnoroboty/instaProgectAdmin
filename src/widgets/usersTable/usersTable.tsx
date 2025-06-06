import type { SortColumn, TableUser } from '@/src/shared/types/types'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser/removeUser.generated'
import { useUnbanUserMutation } from '@/src/queries/user/unbanUser/unbanUser.generated'
import { Block } from '@/src/shared/assets/componentsIcons'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { DropdownTable } from '@/src/widgets/dropdownTable/dropdownTable'
import { ConfirmationModal } from '@/src/widgets/сonfirmationModal/ConfirmationModal'
import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/navigation'

import s from './usersTable.module.scss'

type Props = {
  data: TableUser[]
  onSortChange: (column: SortColumn, currentSort: SortDirection) => void
  refetch: () => void
}

export const UsersTable = ({ data, onSortChange, refetch }: Props) => {
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, { loading }] = useRemoveUserMutation()
  const [unbanUser, { loading: unbanLoading }] = useUnbanUserMutation()
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})
  const [showUnbanModal, setShowUnbanModal] = useState(false)

  const router = useRouter()

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

  const handleViewUser = (userId: string) => {
    router.push(`/users-list/${userId}`)
  }

  const handleSortChange = (column: SortColumn, currentSort: 'none' | SortDirection) => {
    const newSort =
      currentSort === 'none'
        ? SortDirection.Desc
        : currentSort === SortDirection.Desc
          ? SortDirection.Desc
          : SortDirection.Asc

    setSortConfig(prev => ({ ...prev, [column]: currentSort }))
    onSortChange(column, newSort)
  }

  const openUnbanModal = (user: TableUser) => {
    setSelectedUser(user)
    setShowUnbanModal(true)
  }

  const onUnbanUser = async () => {
    try {
      if (!selectedUser) {
        return
      }
      await unbanUser({ variables: { id: parseInt(selectedUser.id, 10) } })
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
            <TableCell className={s.tableHeaderCell}>
              Username{' '}
              <SortButton
                column={'userName'}
                currentSort={sortConfig['userName'] || 'none'}
                onSortChange={handleSortChange}
              />
            </TableCell>
            <TableCell>Profile link</TableCell>
            <TableCell className={s.tableHeaderCell}>
              Date added{' '}
              <SortButton
                column={'createdAt'}
                currentSort={sortConfig['createdAt'] || 'none'}
                onSortChange={handleSortChange}
              />
            </TableCell>
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
                    onBanEdit={() => {
                      if (item.isBlocked) {
                        openUnbanModal(item)
                      } else {
                        console.log('Ban')
                      }
                    }}
                    onDelete={() => handleDeleteUser(item)}
                    onView={() => handleViewUser(item.id)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {showUnbanModal && selectedUser && (
        <ConfirmationModal
          loading={unbanLoading}
          modalMessage={
            <>
              Are you sure want to un-ban{' '}
              <Typography as={'span'} option={'bold_text16'}>
                {selectedUser.userName || selectedUser.profileLink}
              </Typography>
              ?
            </>
          }
          modalTitle={'Un-ban user'}
          onClickNo={() => setShowUnbanModal(false)}
          onCloseModal={() => setShowUnbanModal(false)}
          onCloseParentModal={onUnbanUser}
          open={showUnbanModal}
        />
      )}
      {showDeleteModal && selectedUser && (
        <ConfirmationModal
          loading={loading}
          modalMessage={
            <>
              Are you sure you want to delete{' '}
              <Typography as={'span'} option={'bold_text16'}>
                {selectedUser.profileLink}
              </Typography>
              ?
            </>
          }
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
