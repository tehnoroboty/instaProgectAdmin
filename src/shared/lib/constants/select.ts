import { UserBlockStatus } from '@/src/queries/types'
import { BanReason } from '@/src/shared/types/types'

export const SHOW_USERS_PAGE_SIZE_OPTIONS = [
  { value: '8', valueTitle: '8' },
  { value: '10', valueTitle: '10' },
  { value: '20', valueTitle: '20' },
  { value: '30', valueTitle: '30' },
  { value: '50', valueTitle: '50' },
  { value: '100', valueTitle: '100' },
]

export const SELECT_OPTIONS = [
  { value: UserBlockStatus.All, valueTitle: 'Not selected' },
  { value: UserBlockStatus.Blocked, valueTitle: 'Blocked' },
  { value: UserBlockStatus.Unblocked, valueTitle: 'Not blocked' },
]

export const SELECT_REASON = [
  { value: 'Bad behavior', valueTitle: 'Bad behavior' },
  {
    value: 'Advertising placement',
    valueTitle: 'Advertising placement',
  },
  {
    value: 'Another reason',
    valueTitle: 'Another reason',
  },
]

export const DEFAULT_BAN_REASON: BanReason = SELECT_REASON[2].value as BanReason
