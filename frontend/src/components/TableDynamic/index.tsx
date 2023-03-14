/**
 * create context with Generic Type
 * https://stackoverflow.com/a/75210657/13161255
 */

import { Empty } from '../Empty'
import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { TableDynamicBody } from './TableDynamicBody'
import { TableDynamicBodySkeleton } from './TableDynamicBodySkeleton'
import { TableDynamicContext } from './TableDynamicContext'
import { TableDynamicHead } from './TableDynamicHead'
import {
  HandleSortT,
  IPagination,
  SortDirectionT,
  TableDynamicProps,
} from './types'
import { useState, useRef, useMemo, useCallback } from 'react'

const initPagination: IPagination = {
  pageSize: 10,
}

export const TableDynamic = <T,>({
  columns,
  dataSources = [],
  pagination = initPagination,
  isLoading,
  onRow,
}: TableDynamicProps<T>) => {
  const [page, setPage] = useState(1)
  const [columnSorting, setColumnSorting] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<SortDirectionT>(null)
  const sorterRef = useRef<HandleSortT<T>['sorter']>()

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const { pageSize } = pagination as IPagination

  /**
   * computed data list for current page
   */
  const sliceDataSources = useMemo(() => {
    const firstPageIndex = (page - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize

    if (sortDirection) {
      // clone dataSources to prevent mutate original dataSources
      const cloneDataSources = dataSources.slice(0)

      if (sortDirection === 'ascend') {
        cloneDataSources.sort(sorterRef.current).reverse()
      }

      if (sortDirection === 'descend') {
        cloneDataSources.sort(sorterRef.current)
      }

      return cloneDataSources.slice(firstPageIndex, lastPageIndex)
    }

    return dataSources.slice(firstPageIndex, lastPageIndex)
  }, [page, dataSources, sortDirection])

  const tableDescriptionMemo = useMemo(() => {
    const firstRowIndex = (page - 1) * pageSize + 1
    const lastRowIndex = firstRowIndex + sliceDataSources.length - 1
    return `Showing ${firstRowIndex} to ${lastRowIndex} of ${dataSources.length} entries`
  }, [sliceDataSources, dataSources])

  const handleSort = useCallback(
    ({ columnKey, sortDirection, sorter }: HandleSortT<T>) => {
      setColumnSorting(columnKey)
      sorterRef.current = sorter

      if (!sortDirection) {
        setSortDirection('descend')
        return
      }

      if (sortDirection === 'descend') {
        setSortDirection('ascend')
        return
      }

      if (sortDirection === 'ascend') {
        setSortDirection(null)
        return
      }
    },
    []
  )

  return (
    <>
      <TableDynamicContext.Provider
        value={{
          columns,
          dataSources,
          sliceDataSources,
          pagination,
          handlePageChange,
          isLoading,
          pageSize,
          sortDirection,
          columnSorting,
          handleSort,
          onRow,
        }}
      >
        <Table wrapperClass="max-h-[calc(100vh_-_220px)]">
          <TableDynamicHead />
          {isLoading ? <TableDynamicBodySkeleton /> : <TableDynamicBody />}
        </Table>
        {!isLoading && dataSources.length <= 0 && <Empty />}
      </TableDynamicContext.Provider>

      <div className="mt-4 flex justify-between">
        <div className="text-sm text-gray-500">{tableDescriptionMemo}</div>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          totalCount={dataSources.length}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </>
  )
}
