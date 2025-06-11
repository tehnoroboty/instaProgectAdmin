import { SortDirection } from '@/src/queries/types'
import { ArrowSortDown, ArrowSortUp } from '@/src/shared/assets/componentsIcons'
import { SortColumn } from '@/src/shared/types/types'
import clsx from 'clsx'

import s from './SortButton.module.scss'

type Props<T extends string> = {
  column: T
  currentSort: 'none' | SortDirection
  onSortChange: (column: T, currentSort: 'none' | SortDirection) => void
}
export const SortButton = <T extends string>({ column, currentSort, onSortChange }: Props<T>) => {
  const toggleSort = () => {
    const newSort =
      currentSort === 'none'
        ? SortDirection.Asc
        : currentSort === SortDirection.Asc
          ? SortDirection.Desc
          : 'none'

    // console.log(newSort)

    onSortChange(column, newSort)
  }

  return (
    <button className={clsx(s.sortBtn)} onClick={toggleSort}>
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
