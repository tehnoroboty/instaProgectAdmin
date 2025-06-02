import { gql } from '@apollo/client'

export const GET_FOLLOWERS_BY_USER = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPaymentsByUser(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        price
        endDate
        type
        payments {
          id
          paymentMethod
          amount
          createdAt
          endDate
          type
        }
      }
    }
  }
`
