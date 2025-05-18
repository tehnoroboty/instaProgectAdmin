import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'

import { setAuth } from '../model/slices/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { authChecked, isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!authChecked) {
      const token = localStorage.getItem('authorization')

      dispatch(setAuth({ isAuth: !!token }))
    }
  }, [dispatch, authChecked])

  return { authChecked, isAuth }
}
