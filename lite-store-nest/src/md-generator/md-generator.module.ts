import { Module } from '@nestjs/common';
import { GoodsModule } from './../goods/goods.module';
import { MdGeneratorController } from './md-generator.controller';
import { MdGeneratorService } from './md-generator.service';

@Module({
  controllers: [MdGeneratorController],
  providers: [MdGeneratorService],
  imports: [GoodsModule],
})
export class MdGeneratorModule {}
