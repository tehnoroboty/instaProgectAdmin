import { SortDirection } from '@/src/queries/types'
import { SortColumn } from '@/src/shared/types/types'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'

import s from '@/src/widgets/paymentsTable/tableHeaderCell/tableHeaderCell.module.scss'

type Props = {
  column: SortColumn
  label: string
  onSortChange: (column: SortColumn, direction: 'none' | SortDirection) => void
  sortConfig: Partial<Record<SortColumn, SortDirection>>
}

export const TableHeaderCell = ({ column, label, onSortChange, sortConfig }: Props) => {
  return (
    <div className={s.tableHeaderCell}>
      {label}
      <SortButton
        column={column}
        currentSort={sortConfig[column] || 'none'}
        onSortChange={onSortChange}
      />
    </div>
  )
}
