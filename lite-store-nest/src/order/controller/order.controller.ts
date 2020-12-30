import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { QueryEntityDto } from '../../global-interface/query-entity.dto';
import { OrderEntity } from '../entity/order.entity';
import { OrderService } from '../service/order.service';

@ApiTags('order')
@Controller('api/order')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() order: OrderEntity,
  ): Promise<StatusMessageDto> {
    return this.ordersService.createOrder(req.user.sub, order);
  }

  @Post('query')
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() queryOrdersDto: QueryEntityDto,
  ): Promise<OrderEntity[]> {
    return this.ordersService.getOrders(req.user.sub, queryOrdersDto);
  }
}
