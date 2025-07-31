import { useState } from 'react'

import { SortDirection } from '@/src/queries/types'
import SvgPersonOutline from '@/src/shared/assets/componentsIcons/PersonOutline'
import { SortColumn, TablePayment } from '@/src/shared/types/types'
import { TableHeaderCell } from '@/src/widgets/paymentsTable/tableHeaderCell/tableHeaderCell'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@tehnoroboty/ui-kit'
import Image from 'next/image'

import s from '@/src/widgets/paymentsTable/paymentsTable.module.scss'

type Props = {
  data: TablePayment[]
  onSortChange: (column: SortColumn, direction: SortDirection) => void
}

export const PaymentsTable = ({ data, onSortChange }: Props) => {
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
            <TableHeaderCell
              column={'userName'}
              label={'Username'}
              onSortChange={handleSortChange}
              sortConfig={sortConfig}
            />
          </TableCell>
          <TableCell>
            <TableHeaderCell
              column={'createdAt'}
              label={'Date added'}
              onSortChange={handleSortChange}
              sortConfig={sortConfig}
            />
          </TableCell>
          <TableCell>
            <TableHeaderCell
              column={'amount'}
              label={'Amount, $'}
              onSortChange={handleSortChange}
              sortConfig={sortConfig}
            />
          </TableCell>
          <TableCell>
            <div className={s.tableHeaderCell}>Subscription</div>
          </TableCell>
          <TableCell>
            <TableHeaderCell
              column={'paymentMethod'}
              label={'Payment Method'}
              onSortChange={handleSortChange}
              sortConfig={sortConfig}
            />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className={s.tableCell}>
                <div className={s.avaNameCell}>
                  {item.avatarUrl ? (
                    <Image
                      alt={'User avatar'}
                      className={s.avatarImg}
                      height={36}
                      src={item.avatarUrl}
                      width={36}
                    />
                  ) : (
                    <div className={s.avatarFallback}>
                      <SvgPersonOutline height={24} width={24} />
                    </div> // можно вставить Image с дефолтным аватаром
                  )}
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
