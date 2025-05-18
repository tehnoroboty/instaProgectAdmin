'use client'

import type { TableUser } from '@/src/shared/types/types'

import { useEffect, useState } from 'react'

import { type QueryGetUsersArgs, SortDirection, UserBlockStatus } from '@/src/queries/types'
import { useGetUsersQuery } from '@/src/queries/users/getUsers.generated'
import { usersDataTransform } from '@/src/shared/lib/usersDataTransform'
import { Input } from '@/src/shared/ui/input'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { UsersTable } from '@/src/widgets/usersTable/usersTable'

import s from './showUsersList.module.scss'

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

  const variables: QueryGetUsersArgs = {
    pageNumber: currentPage,
    pageSize: pageSize,
    searchTerm: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc,
    statusFilter: UserBlockStatus.All,
  }
  const { data, error, loading, refetch } = useGetUsersQuery({ variables })

  const [transformedData, setTransformedData] = useState<TableUser[]>([])

  useEffect(() => {
    if (data) {
      if (data.getUsers) {
        console.log(data.getUsers.users)
        const transformed = usersDataTransform(data.getUsers.users)

        setTransformedData(transformed)
        console.log(transformed)
      } else {
        setTransformedData([])
      }

      if (data.getUsers.pagination) {
        setTotalPagesCount(data.getUsers.pagination.pagesCount)
      }
    }
  }, [data])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Input className={s.searchInput} placeholder={'Search'} />
        <SelectBox className={s.selector} options={SELECT_OPTIONS} />
      </div>
      <UsersTable data={transformedData} refetch={refetch} />
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        onPageChange={prev => setCurrentPage(prev.valueOf())}
        onPageSizeChange={prev => setPageSize(prev.valueOf())}
        pageSize={USERS_PER_PAGE}
        totalCount={totalPagesCount}
      />
    </div>
  )
}
