import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'passwordHash'>> {
    const user = await this.usersService.findOne(username);
    if (user && user.passwordHash === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }
}
