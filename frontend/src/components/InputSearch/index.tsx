import { debounce } from 'lodash-es'
import { IconMdiMagnify } from '../Utils/Icon'
import { useDataTableContext } from '@/email-logs/context/DataTableContext'
import { forwardRef, useRef, useEffect } from 'react'

type InputProps = React.ComponentPropsWithoutRef<'input'>

export const InputSearch = forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, ...props }, ref) => {
    const { setSearchText } = useDataTableContext()
    const debouncedSearch = useRef(
      debounce(async (criteria) => {
        setSearchText(criteria)
      }, 350)
    ).current

    useEffect(() => {
      return () => {
        debouncedSearch.cancel()
      }
    }, [])

    return (
      <>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconMdiMagnify />
          </div>
          <input
            ref={ref}
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
            {...props}
            onInput={(e) => {
              const word = (e.target as HTMLInputElement)?.value?.trim()
              if (word.length === 0) {
                setSearchText('')
                return
              }

              debouncedSearch(word)
            }}
          />
        </div>
      </>
    )
  }
)
