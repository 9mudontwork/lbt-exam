import { useDataTableContext } from '@/email-logs/context/DataTableContext'
import { Fragment } from 'react'
import { cx } from '@emotion/css'
import { StatusTypes } from '@/services/interfaces/emailLog'

export const Tab = () => {
  const { currentTab, tabItemsMemo, setCurrentTab } = useDataTableContext()
  return (
    <>
      <div className="border-b border-gray-200 text-center font-medium text-gray-500">
        <ul className="tabs relative -mb-px flex flex-wrap justify-center gap-2">
          {tabItemsMemo.map(({ key, label }) => {
            return (
              <Fragment key={key}>
                <li
                  role="tab"
                  className={cx('', currentTab === key && 'active')}
                >
                  <a
                    role="button"
                    className={cx(
                      'inline-block rounded-t-lg border-b-2 border-transparent p-4 transition-all hover:border-gray-300 hover:text-gray-600',
                      currentTab == key &&
                        'border-b-2 !border-blue-600 !text-blue-600'
                    )}
                    onClick={() => setCurrentTab(key as StatusTypes)}
                  >
                    {label}
                  </a>
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
    </>
  )
}
