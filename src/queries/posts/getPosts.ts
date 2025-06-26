import { gql } from '@apollo/client'

export const getPosts = gql`
    query GetPosts(
        $endCursorPostId: Int
        $searchTerm: String
        $pageSize: Int = 10
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc) {
        getPosts(
            endCursorPostId: $endCursorPostId
            searchTerm: $searchTerm
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection){
            items {
                id
                images{
                    url
                    height
                    width
                }
                ownerId
                description
                createdAt
                updatedAt
                postOwner{
                    userName
                    firstName
                    lastName
                    avatars {
                        url
                    }}
                userBan {
                    createdAt
                    reason
                }
            }

        }
    }
`
