import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ArticleController } from './controller/article.controller';
import { ArticleEntity } from './entity/article.entity';
import { ArticleService } from './service/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UserModule],
  providers: [ArticleService],
  exports: [ArticleService, TypeOrmModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
