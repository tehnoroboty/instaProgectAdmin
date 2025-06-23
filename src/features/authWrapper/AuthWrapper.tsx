'use client'

import { type ReactNode, useEffect } from 'react'

import { useAuth } from '@/src/shared/hooks/useAuth'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { Loader } from '@tehnoroboty/ui-kit'
import { useRouter } from 'next/navigation'

import s from './authWrapper.module.scss'

type Props = {
  children: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const router = useRouter()
  const { authChecked, isAuth } = useAuth()

  useEffect(() => {
    if (!authChecked) {
      return
    }

    if (isAuth) {
      router.push(AppRoutes.USERS_LIST)
    } else {
      router.push(AppRoutes.LOGIN)
    }
  }, [authChecked, isAuth, router])

  if (!authChecked) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
