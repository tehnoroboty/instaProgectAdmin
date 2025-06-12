import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useBanUserMutation } from '@/src/queries/user/banUser/banUser.generated'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser/removeUser.generated'
import { useUnbanUserMutation } from '@/src/queries/user/unbanUser/unbanUser.generated'
import { Block } from '@/src/shared/assets/componentsIcons'
import { DEFAULT_BAN_REASON, SELECT_REASON } from '@/src/shared/lib/constants/select'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { BanReason, SortColumn, TableUser } from '@/src/shared/types/types'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [deleteUser, { loading }] = useRemoveUserMutation()
  const [unbanUser, { loading: unbanLoading }] = useUnbanUserMutation()
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})
  const [showUnbanModal, setShowUnbanModal] = useState<boolean>(false)
  const [showBanModal, setShowBanModal] = useState<boolean>(false)
  const [banReason, setBanReason] = useState<BanReason>(DEFAULT_BAN_REASON)
  const [banUser, { loading: banLoading }] = useBanUserMutation()

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

  const openBanModal = (user: TableUser) => {
    setSelectedUser(user)
    setShowBanModal(true)
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
      setShowBanModal(false)
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
                        openBanModal(item)
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
      {showBanModal && selectedUser && (
        <ConfirmationModal
          loading={banLoading}
          modalTitle={'Ban user'}
          modalMessage={
            <>
              Are you sure want to ban this user,{' '}
              <Typography as={'span'} option={'bold_text16'}>
                {selectedUser.userName || selectedUser.profileLink}
              </Typography>
              ?
              <SelectBox
                className={s.selectBox}
                placeholder={'Reason for ban'}
                onChangeValue={handleChoseReasonChange}
                options={SELECT_REASON}
              />
            </>
          }
          onClickNo={() => {
            setShowBanModal(false)
            setBanReason(DEFAULT_BAN_REASON)
          }}
          onCloseModal={() => {
            setShowBanModal(false)
            setBanReason(DEFAULT_BAN_REASON)
          }}
          onCloseParentModal={onBanUser}
          open={showBanModal}
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
