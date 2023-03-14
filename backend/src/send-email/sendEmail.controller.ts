import { TransformInterceptor } from './../utils/transformInterceptor';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ReqeustDto } from './dto/request.dto';
import { SendEmailService } from './sendEmail.service';

@Controller('send-email')
@UseInterceptors(TransformInterceptor)
export class SendEmailController {
  constructor(private readonly snedEmailService: SendEmailService) {}

  @Post()
  async send(@Body() requestDto: ReqeustDto) {
    return this.snedEmailService.send(requestDto);
  }
}
