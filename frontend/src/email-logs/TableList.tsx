import { dateTimeToFormat } from '@/utils/dayjs'
import { TableDynamic } from '@/components/TableDynamic'
import { ColumnsType, OnRowT } from '@/components/TableDynamic/types'
import { Badge } from '@/components/Badge'
import { useDataTableContext } from './context/DataTableContext'
import { IModalHandle, Modal } from './Modal'
import { useState, useRef, useCallback } from 'react'
import { StatusTypes, TransformEmailLog } from '@/services/interfaces/emailLog'

export const TableList = () => {
  const { isLoading, emailLogsMemo } = useDataTableContext()

  const columns: ColumnsType<TransformEmailLog> = [
    {
      title: 'ID',
      key: 'id',
      className: 'max-w-[120px]',
    },
    {
      title: 'Subject',
      key: 'subject',
      className: 'max-w-[150px]',
    },
    // {
    //   title: 'Sender',
    //   key: 'sender',
    //   className: 'max-w-[120px]',
    //   render: ({ sender }) => {
    //     sender = sender || '-'

    //     return <>{sender}</>
    //   },
    // },
    {
      title: 'Recipient',
      key: 'recipient',
      className: 'min-w-[150px]',
      render: ({ recipient }) => {
        recipient = recipient || '-'

        return <>{recipient}</>
      },
    },

    {
      title: 'Status',
      key: 'isError',
      render: ({ isError }) => {
        const status = isError ? StatusTypes.FAILED : StatusTypes.SUCCESS
        const color = isError ? 'red' : 'green'

        return (
          <>
            <Badge color={color}>{status}</Badge>
          </>
        )
      },
    },
    {
      title: 'Created At',
      key: 'createdAt',
      render: ({ createdAt }) => {
        return (
          <>
            <span>{dateTimeToFormat({ date: createdAt })}</span>
          </>
        )
      },
      sorter: (a, b) => {
        const startedAtA = new Date(a.createdAt).getTime()
        const startedAtB = new Date(b.createdAt).getTime()

        if (startedAtA > startedAtB) {
          return -1
        }

        if (startedAtA < startedAtB) {
          return 1
        }

        return 0
      },
    },
  ]

  const [modalRecord, setModalRecord] = useState<TransformEmailLog | null>(null)
  const modalRef = useRef<IModalHandle>(null)

  const onRowCallback: OnRowT<TransformEmailLog> = useCallback((record) => {
    return {
      onClick: (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (['TR', 'TD'].includes((e.target as HTMLElement).tagName)) {
          setModalRecord(record)
          modalRef.current?.openModal()
        }
      },
    }
  }, [])

  return (
    <>
      <TableDynamic
        dataSources={emailLogsMemo as TransformEmailLog[]}
        columns={columns}
        pagination={{ pageSize: 10 }}
        isLoading={isLoading}
        onRow={onRowCallback}
      />
      <Modal ref={modalRef} record={modalRecord} />
    </>
  )
}
