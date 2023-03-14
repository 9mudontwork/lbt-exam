import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailController } from './sendEmail.controller';

describe('SendEmailController', () => {
  let controller: SendEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendEmailController],
    }).compile();

    controller = module.get<SendEmailController>(SendEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
