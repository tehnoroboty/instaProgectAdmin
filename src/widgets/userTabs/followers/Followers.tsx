import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SortDirection } from '@/src/queries/types'
import { useGetFollowersByUserQuery } from '@/src/queries/user/getFollowersByUser/getFollowersByUser.generated'
import { makeLocaleDate } from '@/src/shared/lib/makeLocaleDate'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { SortColumn } from '@/src/shared/types/types'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { SortButton } from '@/src/shared/ui/sortButton/SortButton'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/src/shared/ui/table'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ApolloError } from '@apollo/client'

import s from './followers.module.scss'

type Props = {
  userId: number
}

const USERS_PER_PAGE = 10

export const Followers = ({ userId }: Props) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [sortConfig, setSortConfig] = useState<Partial<Record<SortColumn, SortDirection>>>({})
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const { data, loading, error } = useGetFollowersByUserQuery({
    variables: {
      userId,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy,
      sortDirection: sortDirection,
    },
  })

  useEffect(() => {
    if (data?.getFollowers.totalCount) {
      setTotalPagesCount(data?.getFollowers.totalCount)
    }
  }, [data?.getFollowers.totalCount, pageSize])

  useEffect(() => {
    if (error) {
      const errorMessage = error instanceof ApolloError ? error.message : 'Unknown error'

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  const users = data?.getFollowers.items

  if (loading) {
    return <div>Loading...</div>
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
        pageSize={USERS_PER_PAGE}
      />
    </>
  )
}
