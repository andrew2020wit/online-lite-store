import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity, ArticleTypes } from 'src/article/entity/article.entity';
import { getPassWordHash } from 'src/auth/utils/getPassWordHash';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { UserEntity, UserRole } from 'src/user/user.entity';
import { getConnection, Repository } from 'typeorm';
import { UserService } from './../../user/user.service';
import { lorem10, lorem200, lorem50 } from './lorem-test-const';

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
        login: 'manager' + n,
        fullName: 'Manager N' + n,
        password: '12',
      });

      await this.userService.adminChangeUser({
        userId: resultId,
        role: UserRole.manager,
      });

      const author = await this.userService.getById(resultId);

      // create articles
      const connection = getConnection();
      for (let m = 1; m <= 200; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title =
          'News N' + m + ' ' + lorem50 + ' from: ' + author.fullName;
        newArt.articleType = ArticleTypes.news;
        newArt.description = 'description N' + m + ' ' + lorem200;

        newArt.text = 'text N' + m + ' ' + lorem200;

        await connection.manager.save(newArt);
      }
      for (let m = 1; m <= 200; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title = 'Review N' + m + ' from: ' + author.fullName;
        newArt.articleType = ArticleTypes.review;
        newArt.description = 'description N' + m + ' ' + lorem10;
        newArt.text = 'text N' + m + ' ' + lorem200;

        await connection.manager.save(newArt);
      }
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
      login: 'admin2',
      fullName: 'Admin N2',
      password: password2,
      role: UserRole.admin,
    });
    // create clients
    await this.userRepository.save({
      login: 'user',
      fullName: 'Hugo Boss',
      password: password2,
      role: UserRole.user,
      defaultDeliverAddress: 'some defaultDeliverAddress of Hugo Boss',
    });
    await this.userRepository.save({
      login: 'user2',
      fullName: 'Secret bayer',
      password: password2,
      role: UserRole.user,
    });
  }

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('article_entity')
      .execute();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('user_entity')
      .execute();
  }
}
