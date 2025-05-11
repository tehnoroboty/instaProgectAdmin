import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('authorization')

    setIsAuth(!!token)
  }, [])

  return isAuth
}
