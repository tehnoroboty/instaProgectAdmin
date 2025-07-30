import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowPaymentsList } from '@/src/features/showPaymentsList/ShowPaymentsList'

export default function PaymentsListPage() {
  return (
    <RequireAuth>
      <ShowPaymentsList />
    </RequireAuth>
  )
}
