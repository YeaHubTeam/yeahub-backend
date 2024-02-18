import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { GetUserProfileQuery } from './queries/get-profiles.queries';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
    private getUserProfileQuery: GetUserProfileQuery,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }

  findProfileByUserId(userId: string) {
    return this.getUserProfileQuery.execute(userId);
  }
}
