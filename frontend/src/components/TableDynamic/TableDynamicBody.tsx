import { Fragment } from 'react'
import { ITableDynamicContext } from './types'
import { Table } from '../Table'
import { TableDynamicBodyCell } from './TableDynamicBodyCell'
import { useTableDynamicContext } from './TableDynamicContext'

export const TableDynamicBody = <T,>() => {
  const { columns, sliceDataSources, onRow } =
    useTableDynamicContext<ITableDynamicContext<T>>()

  return (
    <>
      <Table.Body>
        {sliceDataSources.map((data, i) => {
          return (
            <Fragment key={i}>
              <Table.TR {...onRow?.(data)} className="cursor-pointer">
                {columns.map((column, j) => {
                  const fragmenmtKey = `${i}-${j}`

                  return (
                    <Fragment key={fragmenmtKey}>
                      <TableDynamicBodyCell data={data} column={column} />
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
