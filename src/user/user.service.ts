import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto, PublicUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
  ) {}

  findAll(): Promise<PublicUserDto[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto) {
    return this.createUserCommand.execute(userDto);
  }
}
