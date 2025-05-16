import type { TableUser } from '@/src/shared/types/types'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'

type Props = {
  data: TableUser[]
}

export const UsersTable = ({ data }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Profile link</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.profileLink}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
