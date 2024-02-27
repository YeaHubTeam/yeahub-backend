import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hash, verify as verifyHash } from 'argon2';
import { TokenPayloadDto, UserLoginDto, AuthTokenDto } from '@/auth/types';
import { UserEntityPublic } from '@/user/types';
import { Nullable } from '@/common/utility-types';
import { JWT_KEYS } from '@/auth/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: UserLoginDto['username'],
    password: UserLoginDto['password'],
  ): Promise<Nullable<UserEntityPublic>> {
    const user = await this.usersService.findUserByEmail(username);
    if (user) {
      const isPassportMatch = await verifyHash(user.passwordHash, password);

      if (isPassportMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async signTokens(userToken: TokenPayloadDto): Promise<AuthTokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userToken, {
        secret: JWT_KEYS.ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(userToken, {
        secret: JWT_KEYS.REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    await this.updateRefreshToken(userToken.sub, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    userId: UserEntity['id'],
    refreshToken: UserEntity['refreshToken'],
  ) {
    const tokenHashed = await hash(refreshToken);
    await this.usersService.update(userId, { refreshToken: tokenHashed });
  }
}
