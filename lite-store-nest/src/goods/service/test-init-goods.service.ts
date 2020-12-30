import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';
import {
  lorem200,
  lorem50,
} from './../../testing/init-test-data/lorem-test-const';

@Injectable()
export class TestInitGoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
  ) {}

  async goodsGenerator() {
    await this.clearTables();
    for (let n = 1; n <= 200; n++) {
      await this.goodsRepository.save({
        name: `GoodsName #${n}` + ' ' + lorem50,
        description: `GoodsDescription # ${n}` + ' ' + lorem200,
        price: n * 3,
        currency: '$',
        stockCount: 4 * n,
        maxOrderCount: 100,
      });
    }
  }

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('goods_entity')
      .execute();
  }
}
