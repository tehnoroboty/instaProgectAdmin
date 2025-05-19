import type { TableUser } from '@/src/shared/types/types'

import { Block } from '@/src/shared/assets/componentsIcons'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { DropdownTable } from '@/src/widgets/dropdownTable/dropdownTable'

import s from './usersTable.module.scss'

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
              <TableCell className={s.idCell}>
                <div className={s.flexContainer}>
                  {item.isBlocked && <Block className={s.blockIcon} />}
                  <span className={item.isBlocked ? '' : s.idWithoutIcon}>{item.id}</span>
                </div>
              </TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.profileLink}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <DropdownTable
                  isBanned={item.isBlocked}
                  onBanEdit={() => {}}
                  onDelete={() => {}}
                  onView={() => {}}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
