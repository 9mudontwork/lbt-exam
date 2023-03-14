import { EmailLog, TransformEmailLogs } from '@/services/interfaces/emailLog'
import { Observable } from 'rxjs'
import EmailLogTransformer from '../transformer/EmailLogTransformer'
import { IEmailLogSoruce } from '@/services/repository/emailLog'

class EmailLogMock extends EmailLogTransformer implements IEmailLogSoruce {
  getEmailLogs = () => {
    return new Observable<TransformEmailLogs>((subscribe) => {
      const success: EmailLog[] = [...Array(50)].map((v, i) => {
        const date = new Date('2023-01-31T05:07:21.333Z')
        const mockDate = new Date(
          date.setDate(date.getDate() - i)
        ).toISOString()

        return {
          id: i + 1,
          sender: 'donot_reply_from_mu@yopmail.com',
          recipient: 'test_send_mail_to_mu@yopmail.com',
          subject: 'หัวข้อ ทดสอบอีเมล',
          body: '123123123123123',
          provider: 'sendGrid',
          errorMessage: 'asdasdasd',
          isError: false,
          createdAt: mockDate,
        }
      })

      const error: EmailLog[] = [...Array(50)].map((v, i) => {
        const date = new Date('2023-01-31T05:07:21.333Z')
        const mockDate = new Date(
          date.setDate(date.getDate() - i)
        ).toISOString()

        return {
          id: i + 51,
          sender: '',
          recipient: 'test_send_mail_to_mu@yopmail.com',
          subject: 'หัวข้อ ทดสอบอีเมล',
          body: '123123123123123',
          provider: 'sendGrid',
          errorMessage: 'asdasdasd',
          isError: true,
          createdAt: mockDate,
        }
      })

      const mock: EmailLog[] = [...success, ...error]
      subscribe.next(this.transformList(mock))
      subscribe.complete()
    })
  }
}

export default EmailLogMock
