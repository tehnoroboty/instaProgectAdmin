'use client'

import type { SortColumn, TableUser } from '@/src/shared/types/types'

import { type ChangeEvent, useEffect, useMemo, useState } from 'react'

import { type QueryGetUsersArgs, SortDirection, UserBlockStatus } from '@/src/queries/types'
import { useGetUsersQuery } from '@/src/queries/users/getUsers.generated'
import { usersDataTransform } from '@/src/shared/lib/usersDataTransform'
import { Input } from '@/src/shared/ui/input'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { UsersTable } from '@/src/widgets/usersTable/usersTable'
import debounce from 'lodash/debounce'

import s from './showUsersList.module.scss'

const SHOW_USERS_PAGE_SIZE_OPTIONS = [
  { value: '8', valueTitle: '8' },
  { value: '10', valueTitle: '10' },
  { value: '20', valueTitle: '20' },
  { value: '30', valueTitle: '30' },
  { value: '50', valueTitle: '50' },
  { value: '100', valueTitle: '100' },
]

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
    pageNumber: currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortDirection,
    statusFilter: UserBlockStatus.All,
  }
  const { data, error, loading, refetch } = useGetUsersQuery({ variables })

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
          className={s.searchInput}
          onInput={handleInputChange}
          placeholder={'Search'}
          type={'search'}
        />
        <SelectBox className={s.selector} options={SELECT_OPTIONS} />
      </div>
      <UsersTable data={transformedData} onSortChange={handleSortChange} refetch={refetch} />
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        onPageChange={prev => setCurrentPage(prev.valueOf())}
        onPageSizeChange={prev => setPageSize(prev.valueOf())}
        pageSize={pageSize}
        pageSizeOptions={SHOW_USERS_PAGE_SIZE_OPTIONS}
        totalCount={totalPagesCount}
      />
    </div>
  )
}
