import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailLog } from '../@typeorm/entities/EmailLog';
import { CreateEmailLogDto } from './dto/createEmailLog.dto';

@Injectable()
export class EmailLogsService {
  constructor(
    @InjectRepository(EmailLog)
    private emailLogRepository: Repository<EmailLog>,
  ) {}

  async findAll(): Promise<EmailLog[]> {
    return this.emailLogRepository.find();
  }

  createSuccessLog(createEmailLogDto: CreateEmailLogDto) {
    createEmailLogDto = {
      ...createEmailLogDto,
      isError: false,
    };
    return this.emailLogRepository.save(createEmailLogDto);
  }

  createErrorLog(createEmailLogDto: CreateEmailLogDto) {
    const { errorMessage } = createEmailLogDto;

    createEmailLogDto = {
      ...createEmailLogDto,
      isError: true,
      errorMessage: JSON.stringify(errorMessage),
    };

    return this.emailLogRepository.save(createEmailLogDto);
  }
}
