import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../utils/transformInterceptor';
import { EmailLogsService } from './emailLogs.service';

@Controller('email-logs')
@UseInterceptors(TransformInterceptor)
export class EmailLogsController {
  constructor(private readonly emailLogsService: EmailLogsService) {}

  @Get()
  findAll() {
    return this.emailLogsService.findAll();
  }
}
