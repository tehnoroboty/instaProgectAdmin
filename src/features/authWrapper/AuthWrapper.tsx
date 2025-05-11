'use client'

import { type ReactNode, useEffect } from 'react'

import { useAuth } from '@/src/shared/hooks/useAuth'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './authWrapper.module.scss'

type Props = {
  children: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const router = useRouter()
  const isAuth = useAuth()

  useEffect(() => {
    if (isAuth) {
      router.push(AuthRoutes.HOME)
    }
  }, [isAuth, router])

  if (isAuth === null) {
    // Проверка в процессе (первый рендер)
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  if (isAuth) {
    return <h1 className={s.h1}>Контент для авторизованных пользователей</h1>
  }

  return <>{children}</>
}
