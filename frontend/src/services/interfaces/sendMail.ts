export interface SendEmailResponse {
  statusCode: number
  data: string
}

export interface FormSendEmail {
  recipient: string
  subject: string
  body: string
}
