'use client'

import { useGetUsersQuery } from '@/src/queries/users/getUsers.generated'
import { type QueryGetUsersArgs, SortDirection, UserBlockStatus } from '@/src/queries/types'
import { usersDataTransform } from '@/src/shared/lib/usersDataTransform'
import { UsersTable } from '@/src/widgets/usersTable/usersTable'
import type { TableUser } from '@/src/shared/types/types'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { Input } from '@/src/shared/ui/input'
import s from './showUsersList.module.scss'
import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import type { SortColumn } from '@/src/shared/ui/sortButton/SortButton'

const USERS_PER_PAGE = 8
const SELECT_OPTIONS = [
  { value: UserBlockStatus.All, valueTitle: 'Not selected' },
  { value: UserBlockStatus.Blocked, valueTitle: 'Blocked' },
  { value: UserBlockStatus.Unblocked, valueTitle: 'Not blocked' },
]

export const ShowUsersList = () => {
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [transformedData, setTransformedData] = useState<TableUser[]>([])
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const variables: QueryGetUsersArgs = {
    pageSize,
    pageNumber: currentPage,
    sortBy,
    sortDirection,
    searchTerm,
    statusFilter: UserBlockStatus.All,
  }
  const { data, loading, error, refetch } = useGetUsersQuery({ variables })

  useEffect(() => {
    if (data) {
      if (data.getUsers) {
        const transformed = usersDataTransform(data.getUsers.users)
        setTransformedData(transformed)
      } else {
        setTransformedData([])
      }

      if (data.getUsers.pagination) {
        setTotalPagesCount(data.getUsers.pagination.pagesCount)
      }
    }
  }, [data])

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value)
      }, 500),
    []
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleSortChange = (column: SortColumn, currentSort: SortDirection) => {
    setSortBy(column)
    setSortDirection(currentSort)
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Input
          placeholder={'Search'}
          className={s.searchInput}
          type={'search'}
          onInput={handleInputChange}
        />
        <SelectBox className={s.selector} options={SELECT_OPTIONS} />
      </div>
      <UsersTable data={transformedData} refetch={refetch} onSortChange={handleSortChange} />
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        totalCount={totalPagesCount}
        onPageChange={prev => setCurrentPage(prev.valueOf())}
        onPageSizeChange={prev => setPageSize(prev.valueOf())}
        pageSize={USERS_PER_PAGE}
      />
    </div>
  )
}
