import { Test, TestingModule } from '@nestjs/testing';
import { MdGeneratorController } from './md-generator.controller';

describe('MdGenerator Controller', () => {
  let controller: MdGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdGeneratorController],
    }).compile();

    controller = module.get<MdGeneratorController>(MdGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
