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

export type BanReason = 'Advertising placement' | 'Another reason' | 'Bad behavior'

export type UserModalType = 'ban' | 'delete' | 'unban' | null

export type LoginError = {
  data: {
    error?: string
    messages: string
    statusCode?: number
  }
  status: number
}

export type SystemPaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SelectedSubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type MyPaymentType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: SystemPaymentType
  price: number
  subscriptionId: string
  subscriptionType: SelectedSubscriptionType
  userId: number
}

export type TableData = {
  dateOfPayment: string
  endDate: string
  paymentType: string
  price: string
  subscription: string
}

type ImageType = {
  height?: number
  url: string
  width?: number
}

export type PostType = {
  id: number
  images: ImageType[]
}
