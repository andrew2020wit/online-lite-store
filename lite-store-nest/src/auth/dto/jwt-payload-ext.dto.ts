export class JwtPayloadExtDto {
  login: string;
  sub: string;
  role: string;
  fullName: string;
  iat: number;
  exp: number;
}
