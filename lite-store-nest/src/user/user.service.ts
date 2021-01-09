import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { FindOperator, LessThan, Like, Repository } from 'typeorm';
import { getPassWordHash } from '../auth/utils/getPassWordHash';
import { UserEntity, UserProfile, UserRole } from './user.entity';

class WereObj {
  fullName?: FindOperator<string>;
  isActive?: boolean;
  createdOn?: FindOperator<Date>;
  articleType?: string;
}

export class AdminUserQueryDTO {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  role?: UserRole;
  @ApiProperty()
  isActive?: boolean;
}

export class ChangePasswordDTO {
  currentPW: string;
  newPW: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getById(userId: string): Promise<UserEntity> {
    return await this.repository.findOne(userId);
  }

  async query(queryDto: QueryEntityDto): Promise<UserEntity[]> {
    if (!queryDto.maxItemCount) {
      queryDto.maxItemCount = 1;
    }
    const whereObj: WereObj = {};
    if (queryDto.createdOnLessThan) {
      whereObj.createdOn = LessThan(queryDto.createdOnLessThan);
    }
    if (queryDto.pattern) {
      whereObj.fullName = Like(`%${queryDto.pattern}%`);
    }

    return this.repository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: whereObj,
    });
  }

  async adminChangeUser(
    adminUserQueryDTO: AdminUserQueryDTO,
  ): Promise<StatusMessageDto> {
    const resp = new StatusMessageDto('UserService.adminChangeUser');
    resp.resultId = adminUserQueryDTO.userId;

    const user = await this.repository.findOne(adminUserQueryDTO.userId);

    if (!user) {
      resp.message = 'user not found';
      return resp;
    }
    if (user.role == UserRole.admin) {
      resp.message = 'admin can not be changed!';
      return resp;
    }

    if (adminUserQueryDTO.role) {
      user.role = adminUserQueryDTO.role;
    }
    if ('isActive' in adminUserQueryDTO) {
      user.isActive = adminUserQueryDTO.isActive;
    }

    await this.repository.save(user);
    resp.ok = true;
    return resp;
  }

  async create(entity: UserEntity): Promise<StatusMessageDto> {
    const statusMessage = new StatusMessageDto('UserService.create');

    const sameLogin = await this.repository.findOne({ login: entity.login });

    if (sameLogin) {
      statusMessage.message = 'login already exist';
      return statusMessage;
    }

    delete entity.id;
    delete entity.createdOn;
    delete entity.updatedOn;
    delete entity.isActive;
    delete entity.role;

    entity.password = await getPassWordHash(entity.password);

    const resultEntity = await this.repository.save(entity);
    statusMessage.ok = true;
    statusMessage.resultId = resultEntity.id;

    return statusMessage;
  }

  async edit(
    entity: UserEntity,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    const statusMessage = new StatusMessageDto('UserService.edit');

    if (entity.id !== userIdFromToken) {
      statusMessage.message = 'wrong userId';
      return statusMessage;
    }

    delete entity.createdOn;
    delete entity.updatedOn;
    delete entity.isActive;
    delete entity.role;
    delete entity.password;

    const oldEntity = await this.repository.findOne(userIdFromToken);

    Object.assign(oldEntity, entity);

    const resultEntity = await this.repository.save(oldEntity);
    statusMessage.ok = true;
    statusMessage.resultId = resultEntity.id;

    return statusMessage;
  }

  async changePassword(
    changePasswordDTO: ChangePasswordDTO,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    const statusMessage = new StatusMessageDto('UserService.changePassword');
    console.log('changePasswordDTO', changePasswordDTO);

    if (!changePasswordDTO.newPW) {
      statusMessage.message = 'new password is false';
      return statusMessage;
    }

    const user = await this.repository.findOne(userIdFromToken, {
      select: ['password'],
    });

    console.log('user', user);

    const areEqual = await bcrypt.compare(
      changePasswordDTO.currentPW,
      user.password,
    );

    if (!areEqual) {
      statusMessage.message = 'currentPassword incorrect';
      return statusMessage;
    }

    const pw2 = await getPassWordHash(changePasswordDTO.newPW);

    await this.repository.update(userIdFromToken, {
      password: pw2,
    });

    statusMessage.ok = true;

    return statusMessage;
  }

  async setDefaultPW(userId) {
    const statusMessage = new StatusMessageDto('UserService.setDefaultPW');
    const pw2 = await getPassWordHash('12');
    await this.repository.update(userId, {
      password: pw2,
    });
    statusMessage.ok = true;
    return statusMessage;
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    const user = await this.repository.findOne(userId);

    const userProfile: UserProfile = {
      id: user.id,
      login: user.login,
      fullName: user.fullName,
      role: user.role,
      defaultDeliverAddress: user.defaultDeliverAddress,
      phone: user.phone,
      email: user.email,
    };

    return userProfile;
  }
}
