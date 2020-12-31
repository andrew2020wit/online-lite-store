import { Test, TestingModule } from '@nestjs/testing';
import { MdGeneratorService } from './md-generator.service';

describe('MdGeneratorService', () => {
  let service: MdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdGeneratorService],
    }).compile();

    service = module.get<MdGeneratorService>(MdGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
