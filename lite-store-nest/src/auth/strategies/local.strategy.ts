import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(
    login: string,
    password: string,
  ): Promise<JwtPayloadDto | undefined> {
    const user = await this.authService.validateUserForJWT(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
