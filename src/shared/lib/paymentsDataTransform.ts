import { SubscriptionPaymentsModel } from '@/src/queries/types'
import { formatSubscriptionType } from '@/src/shared/lib/formatSubscriptionType'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { TablePayment } from '@/src/shared/types/types'

export const paymentsDataTransform = (
  payments: Partial<SubscriptionPaymentsModel>[]
): TablePayment[] => {
  return payments.map(payment => {
    const amount = payment.amount ?? 0
    const avatarUrl =
      payment.avatars && payment.avatars.length > 0 ? payment.avatars[0].url || '' : ''
    const dateAdded = makeLocaleDate(payment.createdAt)
    const paymentMethod = payment.paymentMethod || ''
    const subscriptionType = payment.type ? formatSubscriptionType(payment.type) : ''
    const userName = payment.userName || ''

    return {
      amount,
      avatarUrl,
      dateAdded,
      paymentMethod,
      subscriptionType,
      userName,
    }
  })
}
