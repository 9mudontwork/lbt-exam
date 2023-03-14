import { TransformEmailLog } from '@/services/interfaces/emailLog'
import { IconMdiClose } from '@/components/Utils/Icon'
import { cx } from '@emotion/css'
import { forwardRef, useState, useImperativeHandle } from 'react'
import RModal from 'react-modal'

export interface IModalHandle {
  openModal: () => void
  closeModal: () => void
}

export interface IModalProps {
  record: TransformEmailLog | null
}

RModal.setAppElement('#root')

export const Modal = forwardRef<IModalHandle, IModalProps>(
  ({ record }: IModalProps, ref) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
      setIsOpen(true)
    }

    function closeModal() {
      setIsOpen(false)
    }

    useImperativeHandle(ref, () => {
      return {
        openModal,
        closeModal,
      }
    })

    const subject = record?.subject || '-'
    const data = record?._raw || {}

    return (
      <div>
        <RModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          preventScroll={true}
          contentLabel="email-logs-Modal"
          portalClassName={cx(modalIsOpen ? '' : 'hidden')}
          className={
            'fixed top-2/4 left-2/4 right-auto bottom-auto z-50 max-h-[calc(100vh_-_48px)] w-full max-w-xl -translate-x-2/4 -translate-y-2/4 rounded-lg bg-white p-2 shadow outline-none'
          }
          overlayClassName="fixed inset-0 z-40 bg-gray-900/50"
        >
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {subject}
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <IconMdiClose className="text-xl" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="relative h-full max-h-[calc(100vh_-_120px)] overflow-auto p-4">
            <pre className="text-base leading-relaxed text-gray-500">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </RModal>
      </div>
    )
  }
)
