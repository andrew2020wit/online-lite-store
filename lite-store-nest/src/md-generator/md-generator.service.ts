import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntity } from 'src/goods/entity/goods.entity';
import { Repository } from 'typeorm';
import {
  mdTemplate1,
  mdTemplate2,
  mdTemplate3,
  mdTemplate4,
} from './md-template.const';
const fs = require('fs');

@Injectable()
export class MdGeneratorService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
  ) {}

  async create() {
    const targetFolder = './md-generates-files/';

    const goodsEntity = await this.goodsRepository.find({ isActive: true });

    goodsEntity.forEach(value => {
      const path = targetFolder + value.id + '.md';
      const content =
        mdTemplate1 +
        value.name +
        mdTemplate2 +
        value.price +
        mdTemplate3 +
        value.name +
        mdTemplate4;

      fs.writeFile(path, content, err => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
      });
    });
  }
}
