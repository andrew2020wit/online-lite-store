import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './controler/goods.controller';
import { GoodsEntity } from './entity/goods.entity';
import { GoodsService } from './service/goods.service';
import { TestInitGoodsService } from './service/test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsService],
  exports: [TypeOrmModule, TestInitGoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
