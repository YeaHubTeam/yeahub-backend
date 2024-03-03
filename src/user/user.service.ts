import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery, FindUserByIdQuery } from './queries';
import { CreateUserDto, PublicUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
    private findUserByIdQuery: FindUserByIdQuery,
  ) {}


  async getUsers(): Promise<PublicUserDto[]> {
    return await this.getUsersQuery.execute();
  }
  
  async findUserById(id: string): Promise<UserEntity> {
    return await this.findUserByIdQuery.execute(id);
  }

  async createUser(userDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.createUserCommand.execute(userDto);
  }
}
