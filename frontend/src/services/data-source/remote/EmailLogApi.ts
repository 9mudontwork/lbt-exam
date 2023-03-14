import Rxios from '@/services/BaseRxios'
import { map } from 'rxjs'
import EmailLogTransformer from '@/services/data-source/transformer/EmailLogTransformer'
import { IEmailLogSoruce } from '@/services/repository/emailLog'
import { EmailLogResponse } from '@/services/interfaces/emailLog'

class EmailLogApi extends EmailLogTransformer implements IEmailLogSoruce {
  private http: Rxios
  private baseURL: string

  constructor() {
    super()
    this.baseURL = import.meta.env[`VITE_API_URL`]
    this.http = new Rxios({
      baseURL: this.baseURL,
    })
  }

  getEmailLogs = () => {
    const path = '/email-logs'
    return this.http.get<EmailLogResponse>(path).pipe(
      map((data) => {
        const { data: emailLogs } = data
        return this.transformList(emailLogs)
      })
    )
  }
}

export default EmailLogApi
