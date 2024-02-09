import { Test } from '@nestjs/testing';
import { CreateUserCommand } from './create-user.command';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreateUserCommand', () => {
  let createUserCommand: CreateUserCommand;
  let userRepositoryMock: Partial<
    Record<keyof Repository<UserEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserCommand,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    createUserCommand = moduleRef.get<CreateUserCommand>(CreateUserCommand);
  });

  it('должен создать пользователя', async () => {
    const userDto = {
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '1234567890',
      email: 'ivan.ivanov@example.com',
      country: 'Country',
      city: 'City',
      birthday: new Date(),
      address: '123 Main St',
      passwordHash: '123456',
      avatarUrl: 'http://example.com/avatar.jpg',
    };

    const user = new UserEntity();
    Object.assign(user, userDto);

    userRepositoryMock.create.mockReturnValue(user);
    userRepositoryMock.save.mockResolvedValue(user);

    const result = await createUserCommand.execute(userDto);

    expect(userRepositoryMock.create).toHaveBeenCalledWith(userDto);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });
});
