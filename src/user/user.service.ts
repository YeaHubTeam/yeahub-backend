import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
  ) {}

  findUserById(id: string): Promise<UserEntity> {
    return this.getUsersQuery.findOne(id);
  }

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }
}
