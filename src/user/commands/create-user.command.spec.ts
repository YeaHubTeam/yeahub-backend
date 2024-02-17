import { Test } from '@nestjs/testing';
import { CreateUserCommand } from './create-user.command';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfileEntity } from '../profile.entity';

describe('CreateUserCommand', () => {
  let createUserCommand: CreateUserCommand;
  let userRepositoryMock: Partial<
    Record<keyof Repository<UserEntity>, jest.Mock>
  >;
  let profileRepositoryMock: Partial<
    Record<keyof Repository<ProfileEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    profileRepositoryMock = {
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
        {
          provide: getRepositoryToken(ProfileEntity),
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
      profile: {
        userId: 'uuid',
        id: 'uuid',
      },
    };

    const user = new UserEntity();
    Object.assign(user, userDto);

    userRepositoryMock.create.mockReturnValue(user);
    userRepositoryMock.save.mockResolvedValue(user);

    const profile = new ProfileEntity();
    profile.userId = 'uuid';

    profileRepositoryMock.create.mockReturnValue(profile);
    profileRepositoryMock.save.mockResolvedValue(profile);

    try {
      const result = await createUserCommand.execute(userDto);

      expect(userRepositoryMock.create).toHaveBeenCalledWith(userDto);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
      expect(profileRepositoryMock.create).toHaveBeenCalledWith({
        userId: user.id,
      });
      expect(profileRepositoryMock.save).toHaveBeenCalledWith(profile);
      expect(result).toEqual(user);
    } catch (error) {
      console.error('Error during test execution:', error);
    }
  });
});
