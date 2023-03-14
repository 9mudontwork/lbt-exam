import { TransformEmailLogs } from '@/services/interfaces/emailLog'
import { Observable } from 'rxjs'

export interface IEmailLogSoruce {
  getEmailLogs: () => Observable<TransformEmailLogs>
}

class EmailLogRepository {
  private source: IEmailLogSoruce
  constructor(source: IEmailLogSoruce) {
    this.source = source
  }

  getEmailLogs = () => {
    return this.source.getEmailLogs()
  }
}

export default EmailLogRepository
