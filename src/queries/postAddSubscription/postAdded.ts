import { gql } from '@apollo/client';

export const POST_ADDED_SUBSCRIPTION = gql`
    subscription postAdded {
        postAdded {
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
`;
