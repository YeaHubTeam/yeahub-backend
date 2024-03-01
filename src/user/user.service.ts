import { Injectable } from '@nestjs/common';
import { CreateUserCommand, RemoveUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto, PublicUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private removeUserCommand: RemoveUserCommand,
    private getUsersQuery: GetUsersQuery,
  ) {}

  findAll(): Promise<PublicUserDto[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto) {
    return this.createUserCommand.execute(userDto);
  }

  delete(userId: string) {
    return this.removeUserCommand.execute(userId);
  }
}
