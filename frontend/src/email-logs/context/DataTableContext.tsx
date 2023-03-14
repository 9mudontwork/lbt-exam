import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { useViewModel } from './viewModel'
import { StatusTypes, TransformEmailLog } from '@/services/interfaces/emailLog'

type ContextT = {
  isLoading: boolean
  currentTab: StatusTypes
  tabItemsMemo: {
    label: string
    key: string
  }[]
  emailLogsMemo: TransformEmailLog[]
  setSearchText: (text: string) => void
  setCurrentTab: (tab: StatusTypes) => void
  fetchEmailLog: () => void
}
export const DataTableContext = createContext<ContextT>({
  isLoading: true,
} as ContextT)

type Props = PropsWithChildren

export const DataTableContextProvider = ({ children }: Props) => {
  const {
    isFetching,
    currentTab,
    tabItemsMemo,
    emailLogsMemo,
    fetchEmailLog,
    setSearchText,
    setCurrentTab,
  } = useViewModel()

  useEffect(() => {
    fetchEmailLog()
  }, [])

  return (
    <>
      <DataTableContext.Provider
        value={{
          isLoading: isFetching,
          emailLogsMemo,
          currentTab,
          tabItemsMemo,
          setSearchText,
          setCurrentTab,
          fetchEmailLog,
        }}
      >
        {children}
      </DataTableContext.Provider>
    </>
  )
}

export const useDataTableContext = () => {
  return useContext(DataTableContext)
}
