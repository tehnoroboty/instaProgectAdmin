import { useState } from 'react'

import { SortDirection } from '@/src/queries/types'
import { SortColumn, TablePayment } from '@/src/shared/types/types'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'

import s from '@/src/widgets/paymentsTable/paymentsTable.module.scss'

type Props = {
  data: TablePayment[]
  onSortChange: (column: SortColumn, direction: SortDirection) => void
  refetch: () => void
}

export const PaymentsTable = ({ data, onSortChange, refetch }: Props) => {
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})

  const handleSortChange = (column: SortColumn, currentSort: 'none' | SortDirection) => {
    let newSort: SortDirection

    if (currentSort === 'none') {
      newSort = SortDirection.Desc
    } else if (currentSort === SortDirection.Desc) {
      newSort = SortDirection.Desc
    } else {
      newSort = SortDirection.Asc
    }

    setSortConfig(prev => ({ ...prev, [column]: currentSort }))

    onSortChange(column, newSort)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className={s.tableRow}>
          <TableCell>
            <div className={s.tableHeaderCell}>
              Username
              <SortButton
                column={'userName'}
                currentSort={sortConfig['userName'] || 'none'}
                onSortChange={handleSortChange}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className={s.tableHeaderCell}>
              Date added
              <SortButton
                column={'createdAt'}
                currentSort={sortConfig['createdAt'] || 'none'}
                onSortChange={handleSortChange}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className={s.tableHeaderCell}>
              Amount, $
              <SortButton
                column={'amount'}
                currentSort={sortConfig['amount'] || 'none'}
                onSortChange={handleSortChange}
              />
            </div>
          </TableCell>
          <TableCell>
            <div className={s.tableHeaderCell}>Subscription</div>
          </TableCell>
          <TableCell>
            <div className={s.tableHeaderCell}>
              Payment Method
              <SortButton
                column={'paymentMethod'}
                currentSort={sortConfig['paymentMethod'] || 'none'}
                onSortChange={handleSortChange}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className={s.tableCell}>
                <div className={s.avaNameCell}>
                  <img alt={'ava'} className={s.avatarImg} src={item.avatarUrl} />
                  <span>{item.userName}</span>
                </div>
              </TableCell>
              <TableCell className={s.tableCell}>{item.dateAdded}</TableCell>
              <TableCell className={s.tableCell}>{item.amount}$</TableCell>
              <TableCell className={s.tableCell}>{item.subscriptionType}</TableCell>
              <TableCell className={s.tableCell}>{item.paymentMethod}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
