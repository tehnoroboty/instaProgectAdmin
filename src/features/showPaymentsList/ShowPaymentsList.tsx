'use client'

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useGetPaymentsQuery } from '@/src/queries/payments/getPayments.generated'
import { QueryGetPaymentsArgs, SortDirection } from '@/src/queries/types'
import { paymentsDataTransform } from '@/src/shared/lib/paymentsDataTransform'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { TablePayment } from '@/src/shared/types/types'
import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { PaymentsTable } from '@/src/widgets/paymentsTable/paymentsTable'
import debounce from 'lodash/debounce'

import s from '@/src/features/showPaymentsList/showPaymentsList.module.scss'

export type SortColumn = 'amount' | 'createdAt' | 'paymentMethod' | 'userName'

const USERS_PER_PAGE = 6

export const ShowPaymentsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortColumn>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0)
  const [transformedData, setTransformedData] = useState<TablePayment[]>([])

  const dispatch = useDispatch()

  const variables: QueryGetPaymentsArgs = {
    pageNumber: currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortDirection,
  }

  const { data, error, loading, refetch } = useGetPaymentsQuery({ variables })

  useEffect(() => {
    if (data) {
      if (data.getPayments) {
        const newData = paymentsDataTransform(data.getPayments.items)

        setTransformedData(newData)
      } else {
        setTransformedData([])
      }

      if (data.getPayments.totalCount) {
        setTotalPagesCount(data.getPayments.totalCount)
      }
    }
  }, [data])

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  // Добавляем debounce для поиска
  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        setSearchTerm(searchValue)
        setCurrentPage(1)
      }, 500),
    []
  )

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    debouncedSearch(value)
  }

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSortChange = (column: SortColumn, currentSort: SortDirection) => {
    setSortBy(column)
    setSortDirection(currentSort)
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <CheckBox className={s.autoUpdate} label={'Autoubdate'} />
        <Input
          className={s.searchInput}
          onInput={handleSearchChange}
          placeholder={'Search'}
          type={'search'}
        />
      </div>
      {loading ? (
        <div className={s.loading}>
          <Loader color={'#4C8DFF'} size={20} />
        </div>
      ) : (
        <PaymentsTable data={transformedData} onSortChange={handleSortChange} refetch={refetch} />
      )}
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        onPageChange={prev => setCurrentPage(prev.valueOf())}
        onPageSizeChange={prev => setPageSize(prev.valueOf())}
        pageSize={pageSize}
        // pageSizeOptions={SHOW_USERS_PAGE_SIZE_OPTIONS}
        totalCount={totalPagesCount}
      />
    </div>
  )
}
