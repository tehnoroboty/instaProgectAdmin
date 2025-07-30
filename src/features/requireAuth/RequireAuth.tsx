'use client'

import { ReactNode, useEffect } from 'react'

import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@tehnoroboty/ui-kit'
import { useRouter } from 'next/navigation'

import s from './requireAuth.module.scss'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const authChecked = useAppSelector(state => state.auth.authChecked)

  useEffect(() => {
    // Если авторизация проверена и пользователь НЕ авторизован — редиректим
    if (authChecked && !isAuth) {
      router.replace(AppRoutes.LOGIN)
    }
  }, [authChecked, isAuth, router])

  if (!authChecked) {
    return (
      <div className={s.wrapper}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
