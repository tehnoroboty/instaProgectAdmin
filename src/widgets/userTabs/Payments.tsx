import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useGetPaymentsByUserQuery } from '@/src/queries/user/getPaymentsByUser/getPaymentsByUser.generated'
import { formatSubscriptionType } from '@/src/shared/lib/formatSubscriptionType'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { ApolloError } from '@apollo/client'

type Props = {
  userId: number
}

const USERS_PER_PAGE = 10

export const Payments = ({ userId }: Props) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)

  const { data, loading, error, refetch } = useGetPaymentsByUserQuery({
    variables: {
      userId,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    },
  })

  useEffect(() => {
    if (data?.getPaymentsByUser.totalCount) {
      setTotalPagesCount(data?.getPaymentsByUser.totalCount)
    }
  }, [data?.getPaymentsByUser.totalCount, pageSize])

  if (error || !data?.getPaymentsByUser) {
    const errorMessage = error instanceof ApolloError ? error.message : 'Unknown error'

    dispatch(setAppError({ error: errorMessage }))

    return null
  }

  const dataItems = data.getPaymentsByUser

  if (loading) {
    return <div>Loading...</div>
  }

  const payments = dataItems.items.flatMap(subscription =>
    subscription.payments.map(payment => ({
      id: payment.id,
      dateOfPayment: makeLocaleDate(payment.createdAt),
      endDate: makeLocaleDate(subscription.endDate),
      amount: subscription.price,
      subscriptionType: formatSubscriptionType(subscription.type),
      paymentType: payment.paymentMethod,
    }))
  )

  console.log(data.getPaymentsByUser)

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
        totalCount={totalPagesCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={USERS_PER_PAGE}
      />
    </>
  )
}
