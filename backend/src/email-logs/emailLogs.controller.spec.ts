import { Test, TestingModule } from '@nestjs/testing';
import { EmailLogsController } from './emailLogs.controller';
import { EmailLogsService } from './emailLogs.service';

describe('EmailLogsController', () => {
  let controller: EmailLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailLogsController],
      providers: [EmailLogsService],
    }).compile();

    controller = module.get<EmailLogsController>(EmailLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
