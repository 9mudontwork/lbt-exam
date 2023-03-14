import Rxios from '@/services/BaseRxios'
import { map } from 'rxjs'
import { SendEmailSource } from '@/services/repository/sendMail'
import {
  SendEmailResponse,
  FormSendEmail,
} from '@/services/interfaces/sendMail'

class SendEmailApi implements SendEmailSource {
  private http: Rxios
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env[`VITE_API_URL`]
    this.http = new Rxios({
      baseURL: this.baseURL,
    })
  }

  sendEmail = (data: FormSendEmail) => {
    const path = '/send-email'

    return this.http
      .post<SendEmailResponse>(path, data as unknown as Record<string, unknown>)
      .pipe(
        map((data) => {
          return data
        })
      )
  }
}

export default SendEmailApi
