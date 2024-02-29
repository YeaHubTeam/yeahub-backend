import { Injectable } from '@nestjs/common';
import { CreateUserCommand, RemoveUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { GetUserProfileQuery } from './queries/get-user-profile.queries';
@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private removeUserCommand: RemoveUserCommand,
    private getUsersQuery: GetUsersQuery,
    private getUserProfileQuery: GetUserProfileQuery,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }

  remove(userId: string) {
    return this.removeUserCommand.execute(userId);
  }

  findProfileByUserId(userId: string) {
    return this.getUserProfileQuery.execute(userId);
  }
}
