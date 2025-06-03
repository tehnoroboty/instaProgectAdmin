import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useGetFollowingByUserQuery } from '@/src/queries/user/getFollowingByUser/getFollowingByUser.generated'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { SortColumn } from '@/src/shared/types/types'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './following.module.scss'

type Props = {
  userId: number
}

const USERS_PER_PAGE = 10

export const Following = ({ userId }: Props) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { data, loading, error } = useGetFollowingByUserQuery({
    variables: {
      userId,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy,
      sortDirection: sortDirection,
    },
  })

  useEffect(() => {
    if (data?.getFollowing.totalCount) {
      setTotalPagesCount(data?.getFollowing.totalCount)
    }
  }, [data?.getFollowing.totalCount, pageSize])

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  const users = data?.getFollowing.items

  if (loading) {
    return (
      <div className={s.loading}>
        <Loader color={'#4C8DFF'} size={20} />
      </div>
    )
  }

  if (!data?.getFollowing || data.getFollowing.items.length === 0) {
    return <div className={s.noPayments}>No following found</div>
  }

  const handleSortChange = (column: SortColumn, currentSort: SortDirection | 'none') => {
    const newSort =
      currentSort === 'none'
        ? SortDirection.Desc
        : currentSort === SortDirection.Desc
          ? SortDirection.Asc
          : SortDirection.Desc

    setSortBy(column)
    setSortDirection(newSort)
    setSortConfig(prev => ({ ...prev, [column]: currentSort }))
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell className={s.tableHeaderCell}>
              Username
              <SortButton
                column={'userName'}
                currentSort={sortConfig['userName'] || 'none'}
                onSortChange={handleSortChange}
              />
            </TableCell>
            <TableCell>Profile link</TableCell>
            <TableCell className={s.tableHeaderCell}>
              Subscription Date
              <SortButton
                column={'createdAt'}
                currentSort={sortConfig['createdAt'] || 'none'}
                onSortChange={handleSortChange}
              />
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(user => {
            const createdAt = makeLocaleDate(user.createdAt)

            return (
              <TableRow key={user.id}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>
                  <Typography
                    className={s.link}
                    as={'a'}
                    href={`/users-list/${user.userId}`}
                    option={'regular_link'}
                  >
                    {user.userName}
                  </Typography>
                </TableCell>
                <TableCell>{createdAt}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalCount={totalPagesCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
      />
    </>
  )
}
