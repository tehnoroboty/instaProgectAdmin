import type { TableUser } from '@/src/shared/types/types'

import { ConfirmationModal } from '@/src/features/modals/сonfirmationModal/ConfirmationModal'
import { useRemoveUserMutation } from '@/src/queries/user/removeUser.generated'

type Props = {
  refetch: () => void
  selectedUser: TableUser | null
  setSelectedUser: (user: TableUser | null) => void
  setShowDeleteModal: (showDeleteModal: boolean) => void
  showDeleteModal: boolean
}

export const DeleteUserModal = ({
  refetch,
  selectedUser,
  setSelectedUser,
  setShowDeleteModal,
  showDeleteModal,
}: Props) => {
  const [deleteUser, { loading }] = useRemoveUserMutation()

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

  return (
    <ConfirmationModal
      loading={loading}
      modalMessage={`Are you sure you want to delete ${selectedUser?.userName}?`}
      modalTitle={'Delete user'}
      onClickNo={() => setShowDeleteModal(false)}
      onCloseModal={() => setShowDeleteModal(false)}
      onCloseParentModal={() => {}}
      open={showDeleteModal}
    />
  )
}
