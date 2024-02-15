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

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(username: string): Promise<UserEntity> {
    const user = new UserEntity();

    return {
      ...user,
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: 'hashed_password_example',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      country: 'USA',
      city: 'New York',
      birthday: new Date('1990-01-01'),
      address: '123 Main St',
      avatarUrl: 'http://example.com/avatar.jpg',
    };
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }
}
