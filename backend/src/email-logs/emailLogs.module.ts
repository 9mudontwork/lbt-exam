import { EmailLogsController } from './emailLogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmailLogsService } from './emailLogs.service';
import { EmailLog } from '../@typeorm/entities/EmailLog';

@Module({
  imports: [TypeOrmModule.forFeature([EmailLog])],
  controllers: [EmailLogsController],
  providers: [EmailLogsService],
  exports: [EmailLogsService],
})
export class EmailLogsModule {}
