import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_KEYS } from '@/auth/constants';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare as compareHash } from 'bcrypt';
import { UserService } from '@/user/user.service';
import { TokenPayloadExtendedDto } from '@/auth/types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEYS.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, userToken: TokenPayloadExtendedDto) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    if (!refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const user = await this.userService.findUserById(userToken.sub);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const isTokenMatch = await compareHash(refreshToken, user.refreshToken);
    if (!isTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }

    console.log(isTokenMatch);

    return { ...userToken, refreshToken };
  }
}
