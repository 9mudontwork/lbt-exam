import { createContext, useContext } from 'react'
import { ITableDynamicContext } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableDynamicContext = createContext<ITableDynamicContext<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  undefined as any
)

export function useTableDynamicContext<T>() {
  const context = useContext<ITableDynamicContext<T>>(TableDynamicContext)

  if (context === undefined) {
    throw new Error(
      'useTableDynamicContext must be used within a TableDynamicContextProvider'
    )
  }

  return context
}
