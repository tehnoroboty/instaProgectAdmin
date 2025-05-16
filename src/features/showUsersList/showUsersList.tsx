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
  const variables: QueryGetUsersArgs = {
    pageNumber: 1,
    pageSize: USERS_PER_PAGE,
    searchTerm: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc,
    statusFilter: UserBlockStatus.All,
  }
  const { data, error, loading } = useGetUsersQuery({ variables })

  const [transformedData, setTransformedData] = useState<TableUser[]>([])

  useEffect(() => {
    if (data && data.getUsers) {
      const transformed = usersDataTransform(data.getUsers.users)

      setTransformedData(transformed)
      console.log(transformed)
    } else {
      setTransformedData([])
    }
  }, [data])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Input className={s.searchInput} placeholder={'Search'} />
        <SelectBox className={s.selector} options={SELECT_OPTIONS} />
      </div>
      <UsersTable data={transformedData} />
      <Pagination
        className={s.pagination}
        currentPage={1}
        onPageChange={() => {}}
        onPageSizeChange={() => console.log('page change')}
        pageSize={USERS_PER_PAGE}
        totalCount={10}
      />
    </div>
  )
}
