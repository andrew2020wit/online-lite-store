import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadExtDto } from '../dto/jwt-payload-ext.dto';

@Injectable()
export class JwtManagerStrategy extends PassportStrategy(
  Strategy,
  'managerjwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(payload: JwtPayloadExtDto): Promise<JwtPayloadExtDto> {
    if (payload.role != 'admin' && payload.role != 'manager') {
      throw new HttpException(
        'Forbidden, you must be admin or manager',
        HttpStatus.FORBIDDEN,
      );
    }
    return payload;
  }
}
