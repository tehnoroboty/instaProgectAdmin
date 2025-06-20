import { parseISOAndFormat } from '@/src/shared/hooks/parseIsoAndFormat'
import {
  MyPaymentType,
  SelectedSubscriptionType,
  SystemPaymentType,
  TableData,
} from '@/src/shared/types/types'

export const formatPaymentType = (type: SystemPaymentType): string => {
  switch (type) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
    default:
      return type
  }
}

export const formatSubscriptionType = (type: SelectedSubscriptionType): string => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
    default:
      return type
  }
}

export const transformData = (serverData: MyPaymentType[]): TableData[] => {
  return serverData.map(item => ({
    dateOfPayment: parseISOAndFormat(item.dateOfPayment),
    endDate: parseISOAndFormat(item.endDateOfSubscription),
    paymentType: formatPaymentType(item.paymentType),
    price: item.price.toString(),
    subscription: formatSubscriptionType(item.subscriptionType),
  }))
}
