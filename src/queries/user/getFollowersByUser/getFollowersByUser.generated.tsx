import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../types'
const defaultOptions = {} as const

export type GetFollowersByUserQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetFollowersByUserQuery = {
  __typename?: 'Query'
  getFollowers: {
    __typename?: 'FollowPaginationModel'
    items: Array<{
      __typename?: 'Follow'
      createdAt: any
      firstName?: null | string
      id: number
      lastName?: null | string
      userId: number
      userName?: null | string
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetFollowersByUserDocument = gql`
  query GetFollowersByUser(
    $userId: Int!
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getFollowers(
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
        id
        userId
        userName
        firstName
        lastName
        createdAt
      }
    }
  }
`

/**
 * __useGetFollowersByUserQuery__
 *
 * To run a query within a React component, call `useGetFollowersByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowersByUserQuery(
  baseOptions: (
    | { skip: boolean }
    | { skip?: boolean; variables: GetFollowersByUserQueryVariables }
  ) &
    Apollo.QueryHookOptions<GetFollowersByUserQuery, GetFollowersByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetFollowersByUserQuery, GetFollowersByUserQueryVariables>(
    GetFollowersByUserDocument,
    options
  )
}
export function useGetFollowersByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFollowersByUserQuery,
    GetFollowersByUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetFollowersByUserQuery, GetFollowersByUserQueryVariables>(
    GetFollowersByUserDocument,
    options
  )
}
export function useGetFollowersByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFollowersByUserQuery, GetFollowersByUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetFollowersByUserQuery, GetFollowersByUserQueryVariables>(
    GetFollowersByUserDocument,
    options
  )
}
export type GetFollowersByUserQueryHookResult = ReturnType<typeof useGetFollowersByUserQuery>
export type GetFollowersByUserLazyQueryHookResult = ReturnType<
  typeof useGetFollowersByUserLazyQuery
>
export type GetFollowersByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetFollowersByUserSuspenseQuery
>
export type GetFollowersByUserQueryResult = Apollo.QueryResult<
  GetFollowersByUserQuery,
  GetFollowersByUserQueryVariables
>
