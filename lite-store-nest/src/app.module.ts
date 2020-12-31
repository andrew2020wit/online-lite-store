import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { GoodsModule } from './goods/goods.module';
import { LoggerMiddleware } from './logger.middleware';
import { OrderModule } from './order/order.module';
import { InitTestDataService } from './testing/init-test-data/init-test-data.service';
import { TestController } from './testing/test.controller';
import { UserModule } from './user/user.module';
import { MdGeneratorModule } from './md-generator/md-generator.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*', '/graphql*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    GoodsModule,
    OrderModule,
    MdGeneratorModule,
  ],
  providers: [InitTestDataService],
  controllers: [TestController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  constructor(private connection: Connection) {}
}
