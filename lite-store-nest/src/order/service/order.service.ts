import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { LessThan, Repository } from 'typeorm';
import { OrderItemEntity } from '../entity/order-item.entity';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(
    userIdFromToken: string,
    order: OrderEntity,
  ): Promise<StatusMessageDto> {
    const returnMessage: StatusMessageDto = {
      ok: false,
      source: 'createOrder',
      message: '',
    };

    // validation
    if (order.deliverAddress == '') {
      returnMessage.message = 'deliverAddress must be no empty';
      return returnMessage;
    }
    if (order.items.length == 0) {
      returnMessage.message = 'order is empty';
      return returnMessage;
    }
    if (order.items[0].count == 0) {
      returnMessage.message = 'count must be > 0';
      return returnMessage;
    }

    //create order header
    const newOrder = new OrderEntity();
    newOrder.userId = userIdFromToken;
    newOrder.status = 'new';
    newOrder.deliverAddress = order.deliverAddress;
    newOrder.userNote = order.userNote;

    // create orderItems
    newOrder.items = [];
    let orderSum = 0;
    order.items.forEach(item => {
      if (item.count > 0) {
        const newItem = new OrderItemEntity();
        newItem.count = item.count;
        newItem.goodsId = item.goodsId;
        newItem.price = item.price;
        newOrder.items.push(newItem);
        orderSum = orderSum + newItem.price * newItem.count;
      }
    });
    newOrder.orderSum = orderSum;

    //save order
    const savedOrder = await this.ordersRepository.save(newOrder);
    returnMessage.ok = true;
    returnMessage.message = `OrderId: ${savedOrder.id}`;
    returnMessage.resultId = savedOrder.id;
    return returnMessage;
  }

  async getOrders0(userIdFromToken: string, queryOrdersDto: QueryEntityDto) {
    return await this.ordersRepository.find({
      take: queryOrdersDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(queryOrdersDto.createdOnLessThan),
      },
    });
  }

  async getOrders(userIdFromToken: string, queryOrdersDto: QueryEntityDto) {
    return await this.ordersRepository.find();
  }
}
