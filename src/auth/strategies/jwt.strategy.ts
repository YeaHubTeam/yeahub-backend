import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_KEYS } from '@/auth/constants';
import { TokenPayloadExtendedDto } from '../types';
import { UserEntityPublic } from '@/user/types';
import { UserService } from '@/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_KEYS.ACCESS_SECRET,
    });
  }

  async validate({ sub }: TokenPayloadExtendedDto): Promise<UserEntityPublic> {
    const user = await this.userService.findUserById(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userResult } = user;

    return userResult;
  }
}
