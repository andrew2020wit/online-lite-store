import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayloadExtDto } from '../dto/jwt-payload-ext.dto';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'adminjwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(payload: JwtPayloadExtDto): Promise<JwtPayloadExtDto> {
    if (payload.role != 'admin') {
      throw new HttpException(
        'Forbidden, you must be admin',
        HttpStatus.FORBIDDEN,
      );
    }
    return payload;
  }
}
