import { Table } from '../Table'
import { useTableDynamicContext } from './TableDynamicContext'
import { ITableDynamicContext } from './types'
import {
  IconMdiSortAlphabeticalAscending,
  IconMdiSortAlphabeticalDescending,
} from '../Utils/Icon'
import { cx } from '@emotion/css'
import { Fragment } from 'react'

export const TableDynamicHead = <T,>() => {
  const { columns, handleSort, sortDirection, columnSorting } =
    useTableDynamicContext<ITableDynamicContext<T>>()

  const isDescned = sortDirection === 'descend'
  const isAscend = sortDirection === 'ascend'

  return (
    <>
      <Table.Head>
        <Table.TR>
          {columns.map((record) => {
            const { key, title, className, sorter } = record

            return (
              <Fragment key={key as string}>
                <Table.TH
                  onClick={() =>
                    sorter &&
                    handleSort({
                      columnKey: key,
                      sortDirection:
                        columnSorting === key ? sortDirection : null,
                      sorter,
                    })
                  }
                  className={cx(
                    className,
                    sorter && 'hover:cursor-pointer hover:bg-gray-200'
                  )}
                >
                  {sorter && columnSorting === key ? (
                    <>
                      <div className="flex flex-nowrap items-center justify-center gap-2">
                        <span className="leading-none">{title}</span>
                        <div>
                          {isDescned && (
                            <IconMdiSortAlphabeticalDescending className="leading-none" />
                          )}

                          {isAscend && (
                            <IconMdiSortAlphabeticalAscending className="leading-none" />
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>{title}</>
                  )}
                </Table.TH>
              </Fragment>
            )
          })}
        </Table.TR>
      </Table.Head>
    </>
  )
}
