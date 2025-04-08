import { Test, TestingModule } from '@nestjs/testing';
import { PhoneSpecsService } from './phone-specs.service';

describe('PhoneSpecsService', () => {
  let service: PhoneSpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneSpecsService],
    }).compile();

    service = module.get<PhoneSpecsService>(PhoneSpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
