import { ITableDynamicContext } from './types'
import { Table } from '../Table'
import { Skeleton } from '../Skeleton'
import { useTableDynamicContext } from './TableDynamicContext'
import { useMemo, Fragment } from 'react'

export const TableDynamicBodySkeleton = <T,>() => {
  const { columns, pageSize } =
    useTableDynamicContext<ITableDynamicContext<T>>()

  const fakeItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const col = {} as any
    const cloneColumns = columns.slice(0)
    cloneColumns.forEach((column) => {
      col[column.key] = null
    })

    return Array.from({ length: pageSize }, () => col)
  }, [columns])

  return (
    <>
      <Table.Body>
        {fakeItems.map((_, i) => {
          return (
            <Fragment key={i}>
              <Table.TR>
                {columns.map((_, j) => {
                  const fragmentKey = `${i}-${j}`
                  return (
                    <Fragment key={fragmentKey}>
                      <Table.TD>
                        <Skeleton />
                      </Table.TD>
                    </Fragment>
                  )
                })}
              </Table.TR>
            </Fragment>
          )
        })}
      </Table.Body>
    </>
  )
}
