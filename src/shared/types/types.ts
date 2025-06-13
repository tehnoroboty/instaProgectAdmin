import React from 'react'

import { UserBlockStatus } from '@/src/queries/types'
import { SELECT_REASON } from '@/src/shared/lib/constants/select'

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

export type SortColumn = 'userName' | 'createdAt'

export type BanReason = 'Bad behavior' | 'Advertising placement' | 'Another reason'
