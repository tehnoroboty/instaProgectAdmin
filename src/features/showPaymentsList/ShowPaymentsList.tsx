'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useGetPaymentsQuery } from '@/src/queries/payments/getPayments.generated'
import { QueryGetPaymentsArgs, SortDirection } from '@/src/queries/types'
import { paymentsDataTransform } from '@/src/shared/lib/paymentsDataTransform'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { SortColumn } from '@/src/shared/types/types'
import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { PaymentsTable } from '@/src/widgets/paymentsTable/paymentsTable'
import debounce from 'lodash/debounce'

import s from '@/src/features/showPaymentsList/showPaymentsList.module.scss'

const USERS_PER_PAGE = 6

const SHOW_USERS_PAGE_SIZE_OPTIONS = [6, 10, 20, 30, 50, 100].map(value => ({
  value: String(value),
  valueTitle: String(value),
}))

export const ShowPaymentsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(USERS_PER_PAGE)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [sortConfig, setSortConfig] = useState<{
    sortBy: SortColumn
    sortDirection: SortDirection
  }>({
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc,
  })

  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false)

  const dispatch = useDispatch()

  const variables: QueryGetPaymentsArgs = {
    pageNumber: currentPage,
    pageSize,
    searchTerm,
    ...sortConfig,
  }

  const { data, error, loading, refetch } = useGetPaymentsQuery({ variables })

  const transformedData = useMemo(
    () => (data?.getPayments?.items ? paymentsDataTransform(data.getPayments.items) : []),
    [data]
  )

  const totalPagesCount = data?.getPayments?.totalCount || 0

  useEffect(() => {
    if (error) {
      const errorMessage = error.message

      dispatch(setAppError({ error: errorMessage }))
    }
  }, [error, dispatch])

  // Добавляем debounce для поиска
  const handleSearchChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
      }, 500),
    []
  )

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      handleSearchChange.cancel()
    }
  }, [handleSearchChange])

  useEffect(() => {
    if (!autoUpdateEnabled) {
      return
    }

    const intervalId = setInterval(() => {
      void refetch()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [autoUpdateEnabled, refetch])

  const handleSortChange = (column: SortColumn, direction: SortDirection) => {
    setSortConfig({ sortBy: column, sortDirection: direction })
  }

  const handleFocus = () => setAutoUpdateEnabled(false)
  const handleBlur = () => setAutoUpdateEnabled(true)

  return (
    <div className={s.container}>
      <div className={s.header}>
        <CheckBox
          checked={autoUpdateEnabled}
          className={s.autoUpdate}
          label={'Autoupdate'}
          onChange={e => setAutoUpdateEnabled(e.target.checked)}
        />
        <Input
          className={s.searchInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
        <PaymentsTable data={transformedData} onSortChange={handleSortChange} />
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
