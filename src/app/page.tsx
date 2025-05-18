import LoginPage from '@/src/app/auth/login/page'

import { AuthWrapper } from '../features/authWrapper/AuthWrapper'

export default async function Page() {
  return (
    <AuthWrapper>
      <LoginPage />
    </AuthWrapper>
  )
}
