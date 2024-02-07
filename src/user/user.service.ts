import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from 'libs/entities/src';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }
}
