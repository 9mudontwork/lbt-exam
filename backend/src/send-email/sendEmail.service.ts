import { EmailLogsService } from './../email-logs/emailLogs.service';
import { ReqeustDto } from './dto/request.dto';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateEmailLogDto } from '../email-logs/dto/createEmailLog.dto';

/**
 * inject other module
 * ref: https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5
 */

@Injectable()
export class SendEmailService {
  @Inject(EmailLogsService)
  private readonly emailLogsService: EmailLogsService;

  private transporters: Record<string, nodemailer.Transporter>;

  constructor() {
    this.transporters = {
      sendGrid: nodemailer.createTransport({
        host: process.env.SENDGRID_SMTP_HOST,
        auth: {
          user: process.env.SENDGRID_API_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      }),

      mailGun: nodemailer.createTransport({
        host: process.env.MAILGUN_SMTP_HOST,
        auth: {
          user: process.env.MAILGUN_API_USER,
          pass: process.env.MAILGUN_API_KEY,
        },
      }),
    };
  }

  async send(requestDto: ReqeustDto): Promise<string> {
    const { recipient, subject, body } = requestDto;

    for (const [provider, transporter] of Object.entries(this.transporters)) {
      try {
        const info = await transporter.sendMail({
          from: `Mu Test Send Mail <${process.env.EMAIL_FROM}>`,
          to: recipient,
          subject,
          html: body,
        });

        this.emailLogsService.createSuccessLog({
          sender: process.env.EMAIL_FROM,
          provider,
          recipient,
          subject,
          body,
        } as CreateEmailLogDto);

        return `Successfully sent email to ${recipient} through ${provider}`;

        console.log(`Email sent through ${provider}: ${info.messageId}`);
      } catch (err) {
        this.emailLogsService.createErrorLog({
          sender: process.env.EMAIL_FROM,
          provider,
          recipient,
          subject,
          body,
          errorMessage: err,
        } as CreateEmailLogDto);

        throw new InternalServerErrorException();

        console.log('err', { provider, err });
      }
    }

    return 'Failed to send email through any provider';
  }
}
