import type { User } from '@/src/queries/types'
import type { TableUser } from '@/src/shared/types/types'

import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'

export const usersDataTransform = (users: Partial<User>[]): TableUser[] => {
  return users.map(user => {
    const userName =
      user?.profile?.firstName && user?.profile?.lastName
        ? `${user?.profile?.firstName} ${user?.profile?.lastName}`
        : ''

    return {
      createdAt: makeLocaleDate(user.createdAt),
      id: `${user.id}` || '',
      isBlocked: !!user.userBan?.createdAt,
      profileLink: user.userName || '',
      userName,
    }
  })
}
