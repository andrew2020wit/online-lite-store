import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { JwtManagerStrategy } from './strategies/jwt-manager.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({
      // defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    UserModule,
    JwtModule.register({
      //secret: '111',
      secret: process.env.JWT_SECRETKEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [
    JwtAdminStrategy,
    JwtStrategy,
    JwtManagerStrategy,
    LocalStrategy,
    AuthService,
  ],
  controllers: [AuthController, UserController],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
