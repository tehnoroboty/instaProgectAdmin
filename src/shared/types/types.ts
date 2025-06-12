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

export type SortColumn = 'amount' | 'createdAt' | 'paymentMethod' | 'userName'

export type TablePayment = {
  amount: number
  avatarUrl: string
  dateAdded: string
  paymentMethod: string
  subscriptionType: string
  userName: string
}
