import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controller/order.controller';
import { OrderItemEntity } from './entity/order-item.entity';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './service/order.service';
import { TestInitOrderService } from './service/test-init-order.service';

@Module({
  controllers: [OrderController],
  providers: [TestInitOrderService, OrderService],
  imports: [TypeOrmModule.forFeature([OrderItemEntity, OrderEntity])],
  exports: [TypeOrmModule, TestInitOrderService],
})
export class OrderModule {}
