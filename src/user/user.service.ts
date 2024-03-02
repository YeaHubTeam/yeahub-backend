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

  async getUsers(): Promise<PublicUserDto[]> {
    return await this.getUsersQuery.execute();
  }

  async createUser(userDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.createUserCommand.execute(userDto);
  }
}
