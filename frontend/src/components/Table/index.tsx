import { cx } from '@emotion/css'
import { HTMLAttributes } from 'react'

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  wrapperClass?: string
}
type TableHead = HTMLAttributes<HTMLTableSectionElement>
type TableTR = HTMLAttributes<HTMLTableRowElement>
type TableTD = HTMLAttributes<HTMLTableCellElement>
type TableTH = HTMLAttributes<HTMLTableCellElement>
type TableBody = HTMLAttributes<HTMLTableSectionElement>

export const Table = ({
  children,
  className,
  wrapperClass,
  ...props
}: TableProps) => {
  return (
    <>
      <div className={cx('overflow-x-auto', wrapperClass)}>
        <table
          className={cx(
            'w-full table-auto border-separate border-spacing-0 rounded-lg text-start',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    </>
  )
}

Table.Head = ({ children, className, ...props }: TableHead) => {
  return (
    <>
      <thead className={cx('bg-gray-100', className)} {...props}>
        {children}
      </thead>
    </>
  )
}

Table.TR = ({ children, className, ...props }: TableTR) => {
  return (
    <>
      <tr className={cx('hover:bg-gray-50', className)} {...props}>
        {children}
      </tr>
    </>
  )
}

Table.TH = ({ children, className, ...props }: TableTH) => {
  return (
    <>
      <th
        className={cx(
          className,
          'break-words bg-gray-100 px-6 py-3 font-semibold leading-relaxed text-gray-900'
        )}
        {...props}
      >
        {children}
      </th>
    </>
  )
}

Table.Body = ({ children, className, ...props }: TableBody) => {
  return (
    <>
      <tbody className={cx(className)} {...props}>
        {children}
      </tbody>
    </>
  )
}

Table.TD = ({ children, className, ...props }: TableTD) => {
  return (
    <>
      <td
        className={cx(
          className,
          'relative break-words px-6 py-4 text-center',
          'border-b border-gray-200'
        )}
        {...props}
      >
        {children}
      </td>
    </>
  )
}
