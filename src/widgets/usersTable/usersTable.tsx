import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useBanUserMutation } from '@/src/queries/user/banUser/banUser.generated'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser/removeUser.generated'
import { useUnbanUserMutation } from '@/src/queries/user/unbanUser/unbanUser.generated'
import { Block } from '@/src/shared/assets/componentsIcons'
import { DEFAULT_BAN_REASON, SELECT_REASON } from '@/src/shared/lib/constants/select'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { BanReason, SortColumn, TableUser, UserModalType } from '@/src/shared/types/types'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { DropdownTable } from '@/src/widgets/dropdownTable/dropdownTable'
import { ConfirmationModal } from '@/src/widgets/сonfirmationModal/ConfirmationModal'
import { ApolloError } from '@apollo/client'
import {
  SelectBox,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
} from '@tehnoroboty/ui-kit'
import { useRouter } from 'next/navigation'

import s from './usersTable.module.scss'

type Props = {
  data: TableUser[]
  onSortChange: (column: SortColumn, currentSort: SortDirection) => void
  refetch: () => void
}

export const UsersTable = ({ data, onSortChange, refetch }: Props) => {
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [activeModal, setActiveModal] = useState<UserModalType>(null)
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})
  const [banReason, setBanReason] = useState<BanReason>(DEFAULT_BAN_REASON)

  const [unbanUser, { loading: unbanLoading }] = useUnbanUserMutation()
  const [deleteUser, { loading }] = useRemoveUserMutation()
  const [banUser, { loading: banLoading }] = useBanUserMutation()

  const router = useRouter()

  const dispatch = useDispatch()

  const onDeleteUser = async () => {
    if (!selectedUser) {
      return
    }
    try {
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
    const newSort = currentSort === 'none' ? SortDirection.Desc : currentSort

    setSortConfig(prev => ({ ...prev, [column]: currentSort }))
    onSortChange(column, newSort)
  }

  const openModal = (type: UserModalType, user: TableUser) => {
    setSelectedUser(user)
    setActiveModal(type)
  }

  const onUnbanUser = async () => {
    if (!selectedUser) {
      return
    }
    try {
      await unbanUser({ variables: { id: parseInt(selectedUser.id, 10) } })
      setSelectedUser(null)
      refetch()
    } catch (err) {
      const error = err as ApolloError

      dispatch(setAppError({ error: error.message }))
    }
  }
  const onBanUser = async () => {
    try {
      if (!selectedUser || !banReason.trim()) {
        return
      }
      await banUser({
        variables: {
          banReason: banReason.trim(),
          userId: parseInt(selectedUser.id, 10),
        },
      })
      setSelectedUser(null)
      setBanReason(DEFAULT_BAN_REASON)
      setActiveModal(null)
      refetch()
    } catch (err) {
      const error = err as ApolloError

      dispatch(setAppError({ error: error.message }))
    }
  }

  const handleChoseReasonChange = (value: string) => {
    const options = SELECT_REASON.find(r => r.valueTitle === value)

    if (options) {
      setBanReason(options.value as BanReason)
    }
  }

  const handleCloseModal = () => {
    if (activeModal === 'ban') {
      setBanReason(DEFAULT_BAN_REASON)
    }
    setActiveModal(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell className={s.tableHeaderCell}>
              Profile link{' '}
              <SortButton
                column={'userName'}
                currentSort={sortConfig['userName'] || 'none'}
                onSortChange={handleSortChange}
              />
            </TableCell>
            <TableCell>Username</TableCell>
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
          {data.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell className={s.idCell}>
                  <div className={s.flexContainer}>
                    {user.isBlocked && <Block className={s.blockIcon} />}
                    <span className={user.isBlocked ? '' : s.idWithoutIcon}>{user.id}</span>
                  </div>
                </TableCell>
                <TableCell>{user.profileLink}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <DropdownTable
                    isBanned={user.isBlocked}
                    onBanEdit={() => {
                      user.isBlocked ? openModal('unban', user) : openModal('ban', user)
                    }}
                    onDelete={() => openModal('delete', user)}
                    onView={() => handleViewUser(user.id)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {activeModal === 'unban' && selectedUser && (
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
          onClickNo={handleCloseModal}
          onCloseModal={handleCloseModal}
          onCloseParentModal={onUnbanUser}
          open={activeModal === 'unban'}
        />
      )}
      {activeModal === 'ban' && selectedUser && (
        <ConfirmationModal
          loading={banLoading}
          modalMessage={
            <>
              Are you sure want to ban this user,{' '}
              <Typography as={'span'} option={'bold_text16'}>
                {selectedUser.userName || selectedUser.profileLink}
              </Typography>
              ?
              <SelectBox
                className={s.selectBox}
                onChangeValue={handleChoseReasonChange}
                options={SELECT_REASON}
                placeholder={'Reason for ban'}
              />
            </>
          }
          modalTitle={'Ban user'}
          onClickNo={handleCloseModal}
          onCloseModal={handleCloseModal}
          onCloseParentModal={onBanUser}
          open={activeModal === 'ban'}
        />
      )}
      {activeModal === 'delete' && selectedUser && (
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
          onClickNo={handleCloseModal}
          onCloseModal={handleCloseModal}
          onCloseParentModal={onDeleteUser}
          open={activeModal === 'delete'}
        />
      )}
    </>
  )
}
