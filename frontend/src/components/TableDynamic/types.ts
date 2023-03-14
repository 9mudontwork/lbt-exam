export type ColumnsType<T> = Array<{
  title: string
  key: keyof T | string
  className?: string
  render?: (data: T) => React.ReactNode
  sorter?: (a: T, b: T) => number
}>

export interface IPagination {
  pageSize: number
}

export type OnRowT<T> = (record: T) => {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export interface TableDynamicProps<T> {
  dataSources: T[]
  columns: ColumnsType<T>
  pagination?: IPagination
  isLoading?: boolean
  onRow?: OnRowT<T>
}

export interface ITableDynamicContext<T> {
  columns: ColumnsType<T>
  dataSources: T[]
  sliceDataSources: T[]
  pagination?: IPagination
  isLoading?: boolean
  handlePageChange?: (page: number) => void
  pageSize: number
  sortDirection: SortDirectionT
  columnSorting: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSort: ({ columnKey, sortDirection, sorter }: HandleSortT<T>) => any
  onRow?: OnRowT<T>
}

export type SortDirectionT = 'ascend' | 'descend' | null

export type HandleSortT<T> = {
  columnKey: string
  sortDirection: SortDirectionT
  sorter: (a: T, b: T) => number
}
