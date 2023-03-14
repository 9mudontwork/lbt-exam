import { EmailLogsModule } from './../email-logs/emailLogs.module';
import { SendEmailController } from './sendEmail.controller';
import { Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';

@Module({
  imports: [EmailLogsModule],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
