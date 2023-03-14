import { Fragment } from 'react'
import {
  IconMdiChevronLeft,
  IconMdiChevronRight,
  IconMdiDotHorizontal,
} from '../Utils/Icon'
import { PaginationButton } from './PaginationButton'
import { DotsT, usePagination } from './usePagination'

/**
 * https://stackoverflow.com/questions/68014046/warning-each-child-in-a-list-should-have-a-unique-key-prop-but-i-have-key-pro
 *
 * เจอปัญหาใช้ fragment แบบ <> แล้ว error key ตอน loop
 * ต้องใช้แบบเต็ม แล้วใส่ key ใน fragment แทน
 */

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  currentPage: number
  totalCount: number
  onPageChange: (page: number) => void
  siblingCount?: number
  pageSize?: number
  showIfOnePage?: boolean
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 10,
  showIfOnePage = true,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as []

  if (!showIfOnePage) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const isDisableNext = currentPage >= lastPage
  const onNext = () => {
    if (isDisableNext) return
    onPageChange(currentPage + 1)
  }

  const isDisablePrevious = currentPage === 1
  const onPrevious = () => {
    if (isDisablePrevious) return
    onPageChange(currentPage - 1)
  }

  return (
    <ul className="inline-flex -space-x-px">
      <PaginationButton
        disabled={isDisablePrevious}
        onClick={onPrevious}
        className="rounded-l-lg"
      >
        <IconMdiChevronLeft className="inline-block" />
      </PaginationButton>

      {paginationRange.map((pageNumber: number | DotsT, index) => {
        return (
          <Fragment key={`${pageNumber}-${index}`}>
            {pageNumber instanceof Object ? (
              <>
                <PaginationButton
                  active={pageNumber.value === currentPage}
                  onClick={() => onPageChange(pageNumber.value)}
                >
                  <IconMdiDotHorizontal className="inline-block" />
                </PaginationButton>
              </>
            ) : (
              <PaginationButton
                active={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationButton>
            )}
          </Fragment>
        )
      })}

      <PaginationButton
        disabled={currentPage >= lastPage}
        onClick={onNext}
        className="rounded-r-lg"
      >
        <IconMdiChevronRight className="inline" />
      </PaginationButton>
    </ul>
  )
}
