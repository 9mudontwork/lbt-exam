import { isEmpty } from 'lodash-es'
import { proxy, useSnapshot } from 'valtio'
import { useState, useMemo } from 'react'
import {
  EmailLog,
  getIntialEmailLogs,
  StatusTypes,
  TransformEmailLog,
  TransformEmailLogs,
} from '@/services/interfaces/emailLog'
import EmailLogRepository from '@/services/repository/emailLog'
import EmailLogMock from '@/services/data-source/mock/EmailLog'
import EmailLogApi from '@/services/data-source/remote/EmailLogApi'

type State = {
  currentTab: StatusTypes
  emailLogs: TransformEmailLogs
  searchText: string
}

const state = proxy<State>({
  currentTab: StatusTypes.SUCCESS,
  emailLogs: getIntialEmailLogs(),
  searchText: '',
})

export const useViewModel = () => {
  const { currentTab, emailLogs, searchText } = useSnapshot(state)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const emailLogsMemo = useMemo(() => {
    let currentEmailLogs = JSON.parse(JSON.stringify(emailLogs[currentTab]))

    for (const [i, v] of currentEmailLogs.entries()) {
      currentEmailLogs[i]['key'] = v.id
    }

    if (!isEmpty(searchText)) {
      currentEmailLogs = getSearchResult(currentEmailLogs, searchText)
    }

    // sort
    return (currentEmailLogs as TransformEmailLog[]).sort((a, b) => {
      const createdAtA = new Date(a.createdAt).getTime()
      const createdAtB = new Date(b.createdAt).getTime()

      if (createdAtA > createdAtB) {
        return -1
      }

      if (createdAtA < createdAtB) {
        return 1
      }

      return 0
    })
  }, [emailLogs, currentTab, searchText])

  const tabItemsMemo = useMemo(() => {
    const items = []

    for (const [key] of Object.entries(StatusTypes)) {
      const title = StatusTypes[key as keyof typeof StatusTypes]
      const emailLogCount = () => {
        if (key === currentTab) return emailLogsMemo.length

        return emailLogs[key as StatusTypes]?.length
      }

      items.push({
        label: `${title} (${emailLogCount()})`,
        key: key,
      })
    }

    return items
  }, [emailLogsMemo])

  const emailLogRp = useMemo(() => {
    return new EmailLogRepository(new EmailLogApi())

    // mock for test
    return new EmailLogRepository(new EmailLogMock())
  }, [])

  function fetchEmailLog() {
    cleanupData()
    setIsFetching(true)
    emailLogRp.getEmailLogs().subscribe({
      next: (data) => {
        setEmailLog(data)
      },
      error: (err) => {
        cleanupData()
        setIsFetching(false)
      },
      complete: () => {
        setIsFetching(false)
      },
    })
  }

  return {
    currentTab,
    emailLogsMemo,
    searchText,
    tabItemsMemo,
    isFetching,
    setCurrentTab,
    setSearchText,
    setEmailLog,
    fetchEmailLog,
  }
}

function cleanupData() {
  setEmailLog(getIntialEmailLogs())
  state.searchText = ''
}

function setEmailLog(EmailLogs: TransformEmailLogs) {
  state.emailLogs = EmailLogs
}

function setCurrentTab(tab: StatusTypes) {
  state.currentTab = tab
}

function isFounded(value: string, text: string) {
  if (!value) return false

  return value.toLowerCase().includes(text.toLowerCase())
}

function getSearchResult(emailLogs: EmailLog[], searchText: string) {
  return emailLogs.filter((email) => {
    return (
      isFounded(email.recipient, searchText) ||
      isFounded(email.subject, searchText)
    )
  })
}

function setSearchText(text: string) {
  state.searchText = text
}
