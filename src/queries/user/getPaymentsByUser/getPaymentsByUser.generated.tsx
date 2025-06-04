import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetPaymentsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPaymentsByUserQuery = {
  __typename?: 'Query'
  getPaymentsByUser: {
    __typename?: 'PaymentPaginationModel'
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<{
      __typename?: 'SubscriptionByPaymentModel'
      price: number
      endDate?: any | null
      type: Types.SubscriptionType
      payments: Array<{
        __typename?: 'Payment'
        id?: number | null
        paymentMethod?: Types.PaymentMethod | null
        amount?: number | null
        createdAt?: any | null
        endDate?: any | null
        type?: Types.SubscriptionType | null
      }>
    }>
  }
}

export const GetPaymentsByUserDocument = gql`
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

/**
 * __useGetPaymentsByUserQuery__
 *
 * To run a query within a React component, call `useGetPaymentsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPaymentsByUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables> &
    ({ variables: GetPaymentsByUserQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export function useGetPaymentsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export function useGetPaymentsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options
  )
}
export type GetPaymentsByUserQueryHookResult = ReturnType<typeof useGetPaymentsByUserQuery>
export type GetPaymentsByUserLazyQueryHookResult = ReturnType<typeof useGetPaymentsByUserLazyQuery>
export type GetPaymentsByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetPaymentsByUserSuspenseQuery
>
export type GetPaymentsByUserQueryResult = Apollo.QueryResult<
  GetPaymentsByUserQuery,
  GetPaymentsByUserQueryVariables
>
