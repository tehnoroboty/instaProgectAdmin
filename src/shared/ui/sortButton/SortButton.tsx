import { SortDirection } from '@/src/queries/types'
import { ArrowSortDown, ArrowSortUp } from '@/src/shared/assets/componentsIcons'
import { SortColumn } from '@/src/shared/types/types'
import clsx from 'clsx'

import s from './SortButton.module.scss'

type Props = {
  column: SortColumn
  currentSort: 'none' | SortDirection
  onSortChange: (column: SortColumn, currentSort: 'none' | SortDirection) => void
}
export const SortButton = ({ column, currentSort, onSortChange }: Props) => {
  const toggleSort = () => {
    let newSort: 'none' | SortDirection

    switch (currentSort) {
      case 'none':
        newSort = SortDirection.Asc
        break
      case SortDirection.Asc:
        newSort = SortDirection.Desc
        break
      default:
        newSort = 'none'
    }
    onSortChange(column, newSort)
  }

  return (
    <button className={clsx(s.sortBtn)} onClick={toggleSort} type={'button'}>
      <span
        className={clsx(s.arrow, s.up, {
          [s.active]: currentSort === SortDirection.Asc,
          [s.disabled]: currentSort === SortDirection.Desc,
          [s.neutral]: currentSort === 'none',
        })}
      >
        <ArrowSortUp />
      </span>

      <span
        className={clsx(s.arrow, s.down, {
          [s.active]: currentSort === SortDirection.Desc,
          [s.disabled]: currentSort === SortDirection.Asc,
          [s.neutral]: currentSort === 'none',
        })}
      >
        <ArrowSortDown />
      </span>
    </button>
  )
}
