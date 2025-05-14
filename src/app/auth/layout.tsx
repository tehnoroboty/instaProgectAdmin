import React from 'react'

import s from './auth.module.scss'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className={s.container}>{children}</div>
    </>
  )
}
