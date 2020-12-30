import { JwtPayloadExtDto } from '../dto/jwt-payload-ext.dto';

export interface RequestWithJwtUserExtDto extends Request {
  user?: JwtPayloadExtDto;
}
