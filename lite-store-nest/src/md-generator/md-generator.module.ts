import { Module } from '@nestjs/common';
import { MdGeneratorController } from './md-generator.controller';
import { MdGeneratorService } from './md-generator.service';

@Module({
  controllers: [MdGeneratorController],
  providers: [MdGeneratorService]
})
export class MdGeneratorModule {}
