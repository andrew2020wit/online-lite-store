import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPassWordHash } from 'src/auth/utils/getPassWordHash';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { UserEntity, UserRole } from 'src/user/user.entity';
import { getConnection, Repository } from 'typeorm';
import { UserService } from './../../user/user.service';

@Injectable()
export class InitTestDataService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}
  initData(): StatusMessageDto {
    this.clearTables();
    this.usersGenerator();
    return { message: 'done', source: 'initData', ok: true };
  }

  async usersGenerator(): Promise<void> {
    // managers + articles
    for (let n = 1; n <= 3; n++) {
      const { resultId } = await this.userService.create({
        login: '38000000009' + n,
        fullName: 'Manager N' + n,
        password: '12',
      });

      await this.userService.adminChangeUser({
        userId: resultId,
        role: UserRole.manager,
      });
    }
    const password2 = await getPassWordHash('12');
    // create admins

    await this.userRepository.save({
      login: 'admin',
      fullName: 'Admin N1',
      password: password2,
      role: UserRole.admin,
    });

    await this.userRepository.save({
      login: '380000000000',
      fullName: 'Admin N2',
      password: password2,
      role: UserRole.admin,
    });
    // create clients
    await this.userRepository.save({
      login: '380971231234',
      fullName: 'Hugo Boss',
      password: password2,
      role: UserRole.user,
      defaultDeliverAddress: 'some defaultDeliverAddress of Hugo Boss',
    });
    await this.userRepository.save({
      login: '380971231235',
      fullName: 'Secret bayer',
      password: password2,
      role: UserRole.user,
    });
  }

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('user_entity')
      .execute();
  }
}
