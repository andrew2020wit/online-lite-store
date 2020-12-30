import { Test, TestingModule } from '@nestjs/testing';
import { InitTestDataService } from './init-test-data.service';

describe('InitTestDataService', () => {
  let service: InitTestDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitTestDataService],
    }).compile();

    service = module.get<InitTestDataService>(InitTestDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
