import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { FindUserByIdQuery } from './queries/find-user-by-id.query';
import { Nullable } from '@/common/utility-types';
import { FindUserByEmailQuery } from '@/user/queries/find-user-by-email.query';
import { UpdateUserByIdQuery } from '@/user/queries/update-user-by-id.query';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
    private findUserByIdQuery: FindUserByIdQuery,
    private findUserByEmailQuery: FindUserByEmailQuery,
    private updateUserByIdQuery: UpdateUserByIdQuery,
  ) {}

  findUserById(id: UserEntity['id']): Promise<Nullable<UserEntity>> {
    return this.findUserByIdQuery.execute(id);
  }

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  async findUserByEmail(email: UserEntity['email']): Promise<UserEntity> {
    return this.findUserByEmailQuery.execute(email);
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }

  async update(userId: UserEntity['id'], newUserDto: Partial<UserEntity>) {
    await this.updateUserByIdQuery.execute(userId, newUserDto);
  }
}
