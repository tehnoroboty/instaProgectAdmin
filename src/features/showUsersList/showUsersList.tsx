'use client'

import type { SortColumn, TableUser } from '@/src/shared/types/types'

import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { type QueryGetUsersArgs, SortDirection, UserBlockStatus } from '@/src/queries/types'
import { useGetUsersQuery } from '@/src/queries/users/getUsers.generated'
import { SELECT_OPTIONS, SHOW_USERS_PAGE_SIZE_OPTIONS } from '@/src/shared/lib/constants/select'
import { usersDataTransform } from '@/src/shared/lib/usersDataTransform'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { UsersTable } from '@/src/widgets/usersTable/usersTable'
import debounce from 'lodash/debounce'

import s from './showUsersList.module.scss'

const USERS_PER_PAGE = 8

export const ShowUsersList = () => {
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [transformedData, setTransformedData] = useState<TableUser[]>([])
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [sortBunUser, setSortBunUser] = useState<UserBlockStatus>(UserBlockStatus.All)
  const dispatch = useDispatch()

  const variables: QueryGetUsersArgs = {
    pageNumber: currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortDirection,
    statusFilter: sortBunUser,
  }
  const { data, error, loading, refetch } = useGetUsersQuery({ variables })

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

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

  const handleSortOptionsChange = (value: string) => {
    const options = SELECT_OPTIONS.find(o => o.valueTitle === value)

    if (options) {
      setSortBunUser(options.value)
    }
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
        <SelectBox
          className={s.selector}
          onChangeValue={handleSortOptionsChange}
          options={SELECT_OPTIONS}
        />
      </div>
      {loading ? (
        <div className={s.loading}>
          <Loader color={'#4C8DFF'} size={20} />
        </div>
      ) : (
        <UsersTable data={transformedData} onSortChange={handleSortChange} refetch={refetch} />
      )}
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
