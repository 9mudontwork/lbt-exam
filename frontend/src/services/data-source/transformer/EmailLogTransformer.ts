import { isArray } from 'lodash-es'

import {
  EmailLog,
  getIntialEmailLogs,
  StatusTypes,
  TransformEmailLog,
  TransformEmailLogs,
} from '@/services/interfaces/emailLog'

class EmailLogTransformer {
  public transform(emailLog: EmailLog): TransformEmailLog {
    return {
      ...emailLog,
      _raw: emailLog,
    }
  }

  protected transformList(response: EmailLog[]): TransformEmailLogs {
    if (!isArray(response)) return getIntialEmailLogs()

    const emailLogs = getIntialEmailLogs()
    const itemLength = response.length

    for (let i = 0; i < itemLength; i++) {
      const emailLog = this.transform(response[i])
      const { isError } = emailLog

      if (isError) {
        emailLogs?.[StatusTypes.FAILED]?.push(emailLog)
      } else {
        emailLogs?.[StatusTypes.SUCCESS]?.push(emailLog)
      }
    }

    return emailLogs
  }
}

export default EmailLogTransformer
