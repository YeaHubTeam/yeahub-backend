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

  getUsers(): Promise<PublicUserDto[]> {
    return this.getUsersQuery.execute();
  }

  createUser(userDto: CreateUserDto): Promise<PublicUserDto> {
    return this.createUserCommand.execute(userDto);
  }
}
