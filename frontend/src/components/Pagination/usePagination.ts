/**
 * https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
 * https://stackblitz.com/edit/react-1zaeqk?file=src%2FPagination.js
 *
 */

import { useMemo } from 'react'

export type DotsT = {
  value: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

interface Props {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const getRightDotPage = (leftRange: number[]) => {
      const dotPage = (leftRange.at(-1) as number) + siblingCount + 1
      if (dotPage > totalPageCount) return totalPageCount

      return dotPage
    }

    const getLeftDotPage = (rightRange: number[]) => {
      const dotPage = (rightRange.at(0) as number) - siblingCount - 1
      if (dotPage < 1) return 1

      return dotPage
    }

    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      const dots = {
        value: getRightDotPage(leftRange),
      }

      return [...leftRange, dots, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      const dots = {
        value: getLeftDotPage(rightRange),
      }

      return [firstPageIndex, dots, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      const leftDots = {
        value: getLeftDotPage(middleRange),
      }

      const rightDots = {
        value: getRightDotPage(middleRange),
      }

      return [
        firstPageIndex,
        leftDots,
        ...middleRange,
        rightDots,
        lastPageIndex,
      ]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
