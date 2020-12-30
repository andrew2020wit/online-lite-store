import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export interface RequestWithJwtUserDto extends Request {
  user?: JwtPayloadDto;
}
