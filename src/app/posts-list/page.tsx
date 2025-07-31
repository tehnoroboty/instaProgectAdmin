import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowPostsList } from '@/src/features/showPostsList/showPostsList'

export default function UsersListPage() {
  return (
    <RequireAuth>
      <ShowPostsList />
    </RequireAuth>
  )
}
