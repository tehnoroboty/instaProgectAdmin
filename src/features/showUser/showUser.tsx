'use client'

import type { TableUser } from '@/src/shared/types/types'
import type { SortColumn } from '@/src/shared/ui/sortButton/SortButton'

import { type ChangeEvent, useEffect, useMemo, useState } from 'react'

import { type QueryGetUsersArgs, SortDirection, UserBlockStatus } from '@/src/queries/types'
import { useGetUsersQuery } from '@/src/queries/users/getUsers.generated'
import { ArrowBackOutline } from '@/src/shared/assets/componentsIcons'
import { usersDataTransform } from '@/src/shared/lib/usersDataTransform'
import { UserTabs } from '@/src/widgets/userTabs/UserTabs'
import { UserInfo } from '@/src/widgets/userTabs/userInfo/UserInfo'
import debounce from 'lodash/debounce'
import { useParams } from 'next/navigation'

import s from './showUser.module.scss'

const USERS_PER_PAGE = 8
const SELECT_OPTIONS = [
  { value: UserBlockStatus.All, valueTitle: 'Not selected' },
  { value: UserBlockStatus.Blocked, valueTitle: 'Blocked' },
  { value: UserBlockStatus.Unblocked, valueTitle: 'Not blocked' },
]

export const ShowUser = () => {
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [transformedData, setTransformedData] = useState<TableUser[]>([])
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const params = useParams<{ userId: string }>()

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
        <ArrowBackOutline />
        <div>Back to Users List</div>
      </div>
      <div className={s.xxx}>
        <UserInfo userId={params.userId} />
      </div>
      <UserTabs userId={params.userId} />
      {/*<Pagination
        className={s.pagination}
        currentPage={currentPage}
        totalCount={totalPagesCount}
        onPageChange={prev => setCurrentPage(prev.valueOf())}
        onPageSizeChange={prev => setPageSize(prev.valueOf())}
        pageSize={USERS_PER_PAGE}
      />*/}
    </div>
  )
}
