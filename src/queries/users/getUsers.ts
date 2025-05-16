import {gql} from "@apollo/client";

export const getUsers = gql`
query GetUsers(
  $pageSize: Int,
  $pageNumber: Int,
  $sortBy: String,
  $sortDirection: SortDirection,
  $searchTerm: String,
  $statusFilter: UserBlockStatus
) {
  getUsers(
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    sortBy: $sortBy,
    sortDirection: $sortDirection,
    searchTerm: $searchTerm,
    statusFilter: $statusFilter
  ) {
    users {
      id
      userName
      email
      createdAt,
      userBan {
        createdAt, 
        reason
      },
      profile {
        id,
        createdAt,
        firstName,
        lastName
      }
    },
    pagination {
      page
      pageSize,
      pagesCount,
      totalCount      
      
    }
  }
}
`

