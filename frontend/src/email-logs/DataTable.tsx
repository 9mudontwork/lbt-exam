import { Card } from '@/components/Card'
import { InputSearch } from '@/components/InputSearch'
import { Tab } from '@/components/Tab'
import { DataTableContextProvider } from './context/DataTableContext'
import { TableList } from './TableList'
import { FormSendEmail } from '@/send-mail/Form'

export const DataTable = () => {
  return (
    <>
      <DataTableContextProvider>
        <Card className="flex flex-col gap-y-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tab />
            <div className="flex w-full max-w-md items-center gap-4">
              <FormSendEmail />
              <InputSearch placeholder="Search subject, recipient" />
            </div>
          </div>
          <TableList />
        </Card>
      </DataTableContextProvider>
    </>
  )
}
