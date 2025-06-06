import React from 'react'

export type TableUser = {
  createdAt: string
  id: string
  isBlocked: boolean
  profileLink: string
  userName: string
}

export type Tab = {
  page: React.ReactNode
  title: string
  value: string
}

export type SortColumn = 'createdAt' | 'userName'
