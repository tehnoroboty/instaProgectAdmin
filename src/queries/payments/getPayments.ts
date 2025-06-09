import { gql } from '@apollo/client'

export const GET_ALL_PAYMENTS = gql`
  query GetPayments(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        paymentMethod
        amount
        currency
        createdAt
        endDate
        type
        userName
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`
