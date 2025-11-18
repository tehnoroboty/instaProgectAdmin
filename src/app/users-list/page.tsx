import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowUsersList } from '@/src/features/showUsersList/showUsersList'

export default function UsersListPage() {
  return (
    <RequireAuth>
      <ShowUsersList />
    </RequireAuth>
  )
}
