import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useGetPaymentsByUserQuery } from '@/src/queries/user/getPaymentsByUser/getPaymentsByUser.generated'
import { formatSubscriptionType } from '@/src/shared/lib/formatSubscriptionType'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'

import s from './payments.module.scss'

type Props = {
  userId: number
}

const USERS_PER_PAGE = 10

export const Payments = ({ userId }: Props) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)

  const { data, error, loading } = useGetPaymentsByUserQuery({
    variables: {
      pageNumber: currentPage,
      pageSize: pageSize,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      userId,
    },
  })

  useEffect(() => {
    if (data?.getPaymentsByUser.totalCount) {
      setTotalPagesCount(data?.getPaymentsByUser.totalCount)
    }
  }, [data?.getPaymentsByUser.totalCount, pageSize])

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  if (loading) {
    return (
      <div className={s.loading}>
        <Loader color={'#4C8DFF'} size={20} />
      </div>
    )
  }

  if (!data?.getPaymentsByUser || data.getPaymentsByUser.items.length === 0) {
    return <div className={s.noPayments}>No payments found</div>
  }

  const dataItems = data.getPaymentsByUser
  const payments = dataItems.items.flatMap(subscription =>
    subscription.payments.map(payment => ({
      amount: subscription.price,
      dateOfPayment: makeLocaleDate(payment.createdAt),
      endDate: makeLocaleDate(subscription.endDate),
      id: payment.id,
      paymentType: payment.paymentMethod,
      subscriptionType: formatSubscriptionType(subscription.type),
    }))
  )

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date of Payment</TableCell>
            <TableCell>End date of subscription</TableCell>
            <TableCell>Amount, $</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Payment Type</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(payment => {
            return (
              <TableRow key={payment.id}>
                <TableCell>{payment.dateOfPayment}</TableCell>
                <TableCell>{payment.endDate}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.subscriptionType}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalCount={totalPagesCount}
      />
    </>
  )
}
