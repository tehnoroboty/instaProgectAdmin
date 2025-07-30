import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowUser } from '@/src/features/showUser/showUser'

export default function UsersListPage() {
  return (
    <RequireAuth>
      <ShowUser />
    </RequireAuth>
  )
}
