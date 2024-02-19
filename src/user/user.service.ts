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
      id: '9d3f871b-01b0-411b-8792-be7e00cf792a',
      firstName: 'Jora',
      lastName: 'Finesse',
      passwordHash:
        '$2b$10$EzDqRavhGYi.ueeSGgr/OurdNxrWS4YAvPz0IV2YDpgIOfVIsOmHe',
      phone: '+1234567999',
      country: 'USA',
      city: 'New York',
      email: 'jora.finesse@example.com',
      birthday: new Date('1990-01-01T00:00:00.000Z'),
      address: '123 Main St',
      avatarUrl: 'http://example.com/avatar.jpg',
      createdAt: new Date('2024-02-19T17:28:33.351Z'),
      updatedAt: new Date('2024-02-19T17:28:33.351Z'),
    };
  }

  create(userDto: CreateUserDto): Promise<UserEntity> {
    return this.createUserCommand.execute(userDto);
  }
}
