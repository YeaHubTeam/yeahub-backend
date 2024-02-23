import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '@/auth/constants';
import { AuthToken } from '../types';
import { UserEntityPublic } from '@/user/types';
import { UserService } from '@/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate({ sub, username }: AuthToken): Promise<UserEntityPublic> {
    const user = await this.userService.findUserById(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userResult } = user;

    return userResult;
  }
}
