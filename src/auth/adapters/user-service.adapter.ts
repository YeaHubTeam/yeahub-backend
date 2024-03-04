import { Inject, Injectable } from '@nestjs/common';
import { UserServiceInterface } from '@/user/interfaces/user-service.interface';
import { UserEntity } from '@/user/entities/user.entity';
import { Nullable } from '@/common/utility-types';

@Injectable()
export class UserServiceAdapter implements UserServiceInterface {
  constructor(
    @Inject('UserService') private userService: UserServiceInterface,
  ) {}

  findUserByEmail(email: UserEntity['email']): Promise<UserEntity> {
    return this.userService.findUserByEmail(email);
  }

  findUserById(id: UserEntity['id']): Promise<Nullable<UserEntity>> {
    return this.userService.findUserById(id);
  }

  update(
    userId: UserEntity['id'],
    newUserDto: Partial<UserEntity>,
  ): Promise<void> {
    return this.userService.update(userId, newUserDto);
  }
}
