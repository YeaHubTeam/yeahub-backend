import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery, FindUserByIdQuery } from './queries';
import { CreateUserDto, PublicUserDto } from './dto';
import { Nullable } from '@/common/utility-types';
import { FindUserByEmailQuery } from '@/user/queries/find-user-by-email.query';
import { UpdateUserByIdQuery } from '@/user/queries/update-user-by-id.query';
import { UserEntity } from '@/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
    private findUserByIdQuery: FindUserByIdQuery,
    private findUserByEmailQuery: FindUserByEmailQuery,
    private updateUserByIdQuery: UpdateUserByIdQuery,
  ) {}

  async getUsers(): Promise<PublicUserDto[]> {
    return await this.getUsersQuery.execute();
  }

  findUserById(id: UserEntity['id']): Promise<Nullable<UserEntity>> {
    return this.findUserByIdQuery.execute(id);
  }

  async findUserByEmail(email: UserEntity['email']): Promise<UserEntity> {
    return this.findUserByEmailQuery.execute(email);
  }

  async createUser(userDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.createUserCommand.execute(userDto);
  }

  async update(userId: UserEntity['id'], newUserDto: Partial<UserEntity>) {
    await this.updateUserByIdQuery.execute(userId, newUserDto);
  }
}
