import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { FindUserByIdQuery } from './queries/find-user-by-id.query';
import { Nullable } from '@/common/utility-types';

@Injectable()
export class UserService {
  constructor(
    private createUserCommand: CreateUserCommand,
    private getUsersQuery: GetUsersQuery,
    private findUserByIdQuery: FindUserByIdQuery,
  ) {}

  findUserById(id: string): Promise<Nullable<UserEntity>> {
    return this.findUserByIdQuery.execute(id);
  }

  findAll(): Promise<UserEntity[]> {
    return this.getUsersQuery.execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findUserByEmail(username: string): Promise<UserEntity> {
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
