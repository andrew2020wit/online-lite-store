import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { TestInitGoodsService } from 'src/goods/service/test-init-goods.service';
import { TestInitOrderService } from 'src/order/service/test-init-order.service';
import { InitTestDataService } from './init-test-data/init-test-data.service';

@Controller('api/test')
export class TestController {
  constructor(
    private initTestDataService: InitTestDataService,
    private testInitGoodsService: TestInitGoodsService,
    private testInitOrdersService: TestInitOrderService,
  ) {}

  // http://127.0.0.1:3001/api/test/regenerate-test-data
  @ApiTags('testing')
  @Get('regenerate-test-data')
  async init(): Promise<StatusMessageDto> {
    //await this.testInitOrdersService.clearTables();
    await this.initTestDataService.initData();
    //await this.testInitGoodsService.goodsGenerator();

    return { ok: true, source: 'regenerate-test-data', message: 'Done' };
  }
}
