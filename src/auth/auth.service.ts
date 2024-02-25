import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare as compareHash } from 'bcrypt';
import { AuthTokenDto, UserLoginDto } from '@/auth/types';
import { UserEntityPublic } from '@/user/types';
import { Nullable } from '@/common/utility-types';

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
      const isPassportMatch = await compareHash(password, user.passwordHash);

      if (isPassportMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: UserEntity) {
    const payload: AuthTokenDto = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
