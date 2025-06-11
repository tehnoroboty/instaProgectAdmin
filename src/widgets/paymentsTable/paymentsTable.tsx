import { useState } from 'react'

import { SortColumn } from '@/src/features/showPaymentsList/ShowPaymentsList'
import { SortDirection } from '@/src/queries/types'
import { TablePayment } from '@/src/shared/types/types'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'

import s from '@/src/widgets/usersTable/usersTable.module.scss'

type Props = {
  data: TablePayment[]
  onSortChange: (column: SortColumn, currentSort: SortDirection) => void
  refetch: () => void
}

export const PaymentsTable = ({ onSortChange }: Props) => {
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})

  const handleSortChange = (column: SortColumn, currentSort: 'none' | SortDirection) => {
    let newSort: SortDirection

    if (currentSort === 'none') {
      newSort = SortDirection.Desc
    } else if (currentSort === SortDirection.Desc) {
      newSort = SortDirection.Asc
    } else {
      newSort = SortDirection.Desc
    }

    setSortConfig(prev => ({ ...prev, [column]: newSort }))

    onSortChange(column, newSort)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell className={s.tableHeaderCell}>
            Username{' '}
            <SortButton
              column={'userName'}
              currentSort={sortConfig['userName'] || 'none'}
              onSortChange={handleSortChange}
            />
          </TableCell>
          <TableCell className={s.tableHeaderCell}>
            Date added{' '}
            <SortButton
              column={'createdAt'}
              currentSort={sortConfig['createdAt'] || 'none'}
              onSortChange={handleSortChange}
            />
          </TableCell>
          <TableCell className={s.tableHeaderCell}>
            Amount, ${' '}
            <SortButton
              column={'amount'}
              currentSort={sortConfig['amount'] || 'none'}
              onSortChange={handleSortChange}
            />
          </TableCell>
          <TableCell>Subscription</TableCell>
          <TableCell className={s.tableHeaderCell}>
            Payment Method{' '}
            <SortButton
              column={'paymentMethod'}
              currentSort={sortConfig['paymentMethod'] || 'none'}
              onSortChange={handleSortChange}
            />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{data.map((item, index) => {*/}
        {/*  return (*/}
        {/*    <TableRow key={index}>*/}
        {/*      <TableCell className={s.idCell}>*/}
        {/*        <div className={s.flexContainer}>*/}
        {/*          {item.isBlocked && <Block className={s.blockIcon} />}*/}
        {/*          <span className={item.isBlocked ? '' : s.idWithoutIcon}>{item.id}</span>*/}
        {/*        </div>*/}
        {/*      </TableCell>*/}
        {/*      <TableCell>{item.userName}</TableCell>*/}
        {/*      <TableCell>{item.profileLink}</TableCell>*/}
        {/*      <TableCell>{item.createdAt}</TableCell>*/}
        {/*      <TableCell>*/}
        {/*        <DropdownTable*/}
        {/*          isBanned={item.isBlocked}*/}
        {/*          onBanEdit={() => {}}*/}
        {/*          onDelete={() => handleDeleteUser(item)}*/}
        {/*          onView={() => handleViewUser(item.id)}*/}
        {/*        />*/}
        {/*      </TableCell>*/}
        {/*    </TableRow>*/}
        {/*  )*/}
        {/*})}*/}
      </TableBody>
    </Table>
  )
}
