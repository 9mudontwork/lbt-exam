import { Observable } from 'rxjs'
import { FormSendEmail, SendEmailResponse } from '../interfaces/sendMail'

export interface SendEmailSource {
  sendEmail: (data: FormSendEmail) => Observable<SendEmailResponse>
}

class SendMailRepository {
  private source: SendEmailSource
  constructor(source: SendEmailSource) {
    this.source = source
  }

  sendEmail = (data: FormSendEmail) => {
    return this.source.sendEmail(data)
  }
}

export default SendMailRepository
