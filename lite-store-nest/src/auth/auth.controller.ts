import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, UserProfile } from './auth.service';
import { JWTokenDTO } from './dto/token-object.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithJwtUserExtDto } from './interfaces/request-with-user-ext.interface';
import { RequestWithJwtUserDto } from './interfaces/request-with-user.interface';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('get-token')
  async login(@Request() req: RequestWithJwtUserDto): Promise<JWTokenDTO> {
    return this.authService.getTokenObject(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('update-token')
  async updateToken(
    @Request() req: RequestWithJwtUserExtDto,
  ): Promise<JWTokenDTO> {
    return await this.authService.updateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user-profile')
  async getUserProfile(
    @Request() req: RequestWithJwtUserExtDto,
  ): Promise<UserProfile> {
    const resp = await this.authService.getUserProfile(req.user.sub);
    // console.log('resp ', resp);
    return resp;
  }
}
