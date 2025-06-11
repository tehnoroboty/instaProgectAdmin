import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type GetPaymentsQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPaymentsQuery = {
  __typename?: 'Query'
  getPayments: {
    __typename?: 'PaymentsPaginationModel'
    items: Array<{
      __typename?: 'SubscriptionPaymentsModel'
      amount?: null | number
      avatars?: Array<{
        __typename?: 'Avatar'
        fileSize?: null | number
        height?: null | number
        url?: null | string
        width?: null | number
      }> | null
      createdAt?: any | null
      currency?: Types.CurrencyType | null
      endDate?: any | null
      id?: null | number
      paymentMethod: Types.PaymentMethod
      type: Types.SubscriptionType
      userId?: null | number
      userName: string
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetPaymentsDocument = gql`
  query GetPayments(
    $pageSize: Int = 10
    $pageNumber: Int = 1
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

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetPaymentsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options)
}
export function useGetPaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options
  )
}
export function useGetPaymentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options
  )
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>
