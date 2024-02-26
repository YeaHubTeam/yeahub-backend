import { JwtPayload } from 'jsonwebtoken';

export type TokenPayloadDto = {
  sub: string;
  username: string;
};

export type TokenPayloadExtendedDto = TokenPayloadDto & JwtPayload;

export type UserLoginDto = {
  username: string;
  password: string;
};

export type AuthTokenDto = {
  access_token: string;
  refresh_token: string;
};
