import { gql } from '@apollo/client'

export const UNBAN_USER = gql`
  mutation UnbanUser($id: Int!) {
    unbanUser(userId: $id)
  }
`
