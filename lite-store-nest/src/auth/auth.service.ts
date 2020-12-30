import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtPayloadExtDto } from './dto/jwt-payload-ext.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JWTokenDTO } from './dto/token-object.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserForJWT(
    login: string,
    password1: string,
  ): Promise<JwtPayloadDto> {
    const user = await this.userRepository.findOne({
      where: { login },
      select: ['login', 'fullName', 'id', 'role', 'password'],
    });
    if (!user) {
      return null;
    }
    const areEqual = await bcrypt.compare(password1, user.password);

    if (!areEqual) {
      console.log('bcrypt.compare(password1, user.password);');
      return null;
    }
    return {
      id: user.id,
      login: user.login,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async getTokenObject(jwtPayloadDto: JwtPayloadDto): Promise<JWTokenDTO> {
    return {
      access_token: this.jwtService.sign({
        login: jwtPayloadDto.login,
        sub: jwtPayloadDto.id,
        role: jwtPayloadDto.role,
        fullName: jwtPayloadDto.fullName,
      }),
    };
  }

  async updateToken(jwtPayloadExtDto: JwtPayloadExtDto): Promise<JWTokenDTO> {
    return {
      access_token: this.jwtService.sign({
        login: jwtPayloadExtDto.login,
        sub: jwtPayloadExtDto.sub,
        role: jwtPayloadExtDto.role,
        fullName: jwtPayloadExtDto.fullName,
      }),
    };
  }
}
