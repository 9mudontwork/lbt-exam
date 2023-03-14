import { isValidElement } from 'react'
import { Table } from '../Table'
import { ColumnsType } from './types'

const isTDElement = (node: React.ReactNode): node is React.ReactElement => {
  return isValidElement(node) && node.type === 'td'
}

type TableDynamicBodyCellProps<T> = {
  data: T
  column: ColumnsType<T>[number]
}

export const TableDynamicBodyCell = <T,>({
  data,
  column,
}: TableDynamicBodyCellProps<T>) => {
  const { key, render, className } = column
  const columnKey = key as keyof T

  const renderCell = () => {
    if (render && isTDElement(render(data))) {
      return render(data)
    }

    if (render && !isTDElement(render(data))) {
      return (
        <Table.TD className={className}>
          <>{render(data)}</>
        </Table.TD>
      )
    }

    return (
      <Table.TD className={className}>
        <>{data[columnKey]}</>
      </Table.TD>
    )
  }

  return <>{renderCell()}</>
}
