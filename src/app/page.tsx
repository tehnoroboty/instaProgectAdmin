'use client'

import { useEffect } from 'react'

import { useAuth } from '@/src/shared/hooks/useAuth'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { useRouter } from 'next/navigation'

import { Loader } from '../shared/ui/loader/Loader'

export default function HomePage() {
  const router = useRouter()
  const { authChecked, isAuth } = useAuth()

  useEffect(() => {
    if (!authChecked) {
      return
    }

    router.push(isAuth ? AppRoutes.USERS_LIST : AppRoutes.LOGIN)
  }, [isAuth, authChecked, router])

  if (!authChecked) {
    return <Loader />
  }

  return null
}
