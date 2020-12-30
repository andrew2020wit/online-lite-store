import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private repository: Repository<GoodsEntity>,
  ) {}

  async getById(id: string): Promise<GoodsEntity> {
    return await this.repository.findOne(id);
  }

  async query(queryDto: QueryEntityDto): Promise<GoodsEntity[]> {
    return this.repository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(new Date(queryDto.createdOnLessThan)),
        name: Like(`%${queryDto.pattern}%`),
        isActive: true,
      },
    });
  }

  async createOrEdit(entity: GoodsEntity): Promise<StatusMessageDto> {
    const result = new StatusMessageDto('GoodsService.createOrEdit');

    if (!entity) {
      result.message = 'entity empty';
      return result;
    }

    let newEntity: GoodsEntity;

    if (entity.id) {
      // edit
      newEntity = await this.repository.findOne(entity.id);
      if (!newEntity) {
        result.message = 'entityId not exist';
        return result;
      }
    } else {
      // create
      newEntity = new GoodsEntity();
      // Validation
      if (!entity.name || !entity.price) {
        result.message = 'entity without name or price';
        return result;
      }
    }

    if ('bigPhotoUrl' in entity) {
      newEntity.bigPhotoUrl = entity.bigPhotoUrl;
    }
    if ('smallPhotoUrl' in entity) {
      newEntity.smallPhotoUrl = entity.smallPhotoUrl;
    }
    if ('currency' in entity) {
      newEntity.currency = entity.currency;
    }
    if ('description' in entity) {
      newEntity.description = entity.description;
    }
    if ('isActive' in entity) {
      newEntity.isActive = entity.isActive;
    }
    if ('maxOrderCount' in entity) {
      newEntity.maxOrderCount = entity.maxOrderCount;
    }
    if ('name' in entity) {
      newEntity.name = entity.name;
    }
    if ('price' in entity) {
      newEntity.price = entity.price;
    }
    if ('stockCount' in entity) {
      newEntity.stockCount = entity.stockCount;
    }

    const resultEntity = await this.repository.save(newEntity);
    result.ok = true;
    result.resultId = resultEntity.id;

    return result;
  }

  async savePhotoUrl(
    entityId: string,
    photoType: string,
    filename: string,
  ): Promise<StatusMessageDto> {
    const result = new StatusMessageDto('GoodsService.savePhotoUrl');
    const newEntity = await this.repository.findOne(entityId);
    if (!newEntity) {
      result.message = 'entityId not exist';
      return result;
    }

    if (photoType === 'bigPhotoUrl') {
      await this.repository.update(entityId, {
        bigPhotoUrl: `/photos/${filename}`,
      });
    } else if (photoType === 'smallPhotoUrl') {
      await this.repository.update(entityId, {
        smallPhotoUrl: `/photos/${filename}`,
      });
    } else {
      result.message = 'wrong type';
      return result;
    }
    result.ok = true;
    return result;
  }
}
