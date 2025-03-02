import { Test, TestingModule } from '@nestjs/testing';
import { PhoneSpecsController } from './phone-specs.controller';

describe('PhoneSpecsController', () => {
  let controller: PhoneSpecsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneSpecsController],
    }).compile();

    controller = module.get<PhoneSpecsController>(PhoneSpecsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
