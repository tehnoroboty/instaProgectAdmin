import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../types'
const defaultOptions = {} as const

export type GetFollowingByUserQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetFollowingByUserQuery = {
  __typename?: 'Query'
  getFollowing: {
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

export const GetFollowingByUserDocument = gql`
  query GetFollowingByUser(
    $userId: Int!
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getFollowing(
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
 * __useGetFollowingByUserQuery__
 *
 * To run a query within a React component, call `useGetFollowingByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowingByUserQuery(
  baseOptions: (
    | { skip: boolean }
    | { skip?: boolean; variables: GetFollowingByUserQueryVariables }
  ) &
    Apollo.QueryHookOptions<GetFollowingByUserQuery, GetFollowingByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetFollowingByUserQuery, GetFollowingByUserQueryVariables>(
    GetFollowingByUserDocument,
    options
  )
}
export function useGetFollowingByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFollowingByUserQuery,
    GetFollowingByUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetFollowingByUserQuery, GetFollowingByUserQueryVariables>(
    GetFollowingByUserDocument,
    options
  )
}
export function useGetFollowingByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFollowingByUserQuery, GetFollowingByUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetFollowingByUserQuery, GetFollowingByUserQueryVariables>(
    GetFollowingByUserDocument,
    options
  )
}
export type GetFollowingByUserQueryHookResult = ReturnType<typeof useGetFollowingByUserQuery>
export type GetFollowingByUserLazyQueryHookResult = ReturnType<
  typeof useGetFollowingByUserLazyQuery
>
export type GetFollowingByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetFollowingByUserSuspenseQuery
>
export type GetFollowingByUserQueryResult = Apollo.QueryResult<
  GetFollowingByUserQuery,
  GetFollowingByUserQueryVariables
>
