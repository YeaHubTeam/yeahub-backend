import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserCommand } from '../commands';
import { UserEntity } from '../entities/user.entity';
import { PublicUserDto } from '../dto';

describe('CreateUserCommand', () => {
  let createUserCommand: CreateUserCommand;
  let userRepositoryMock: Partial<
    Record<keyof Repository<UserEntity>, jest.Mock>
  >;
  // let profileRepositoryMock: Partial<
  //   Record<keyof Repository<ProfileEntity>, jest.Mock>
  // >;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    // profileRepositoryMock = {
    //   create: jest.fn(),
    //   save: jest.fn(),
    // };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserCommand,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
        // {
        //   provide: getRepositoryToken(ProfileEntity),
        //   useValue: userRepositoryMock,
        // },
      ],
    }).compile();

    createUserCommand = moduleRef.get<CreateUserCommand>(CreateUserCommand);
  });

  it('должен создать пользователя', async () => {
    const userDto: PublicUserDto = {
      id: 'uuid',
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '1234567890',
      email: 'ivan.ivanov@example.com',
      country: 'Country',
      city: 'City',
      birthday: new Date(),
      address: '123 Main St',
      avatarUrl: 'http://example.com/avatar.jpg',
      profile: {
        id: 'uuid',
      },
    };

    const user = new UserEntity();
    const publicUserDto = new PublicUserDto(user);
    Object.assign(userDto, publicUserDto);

    userRepositoryMock.create.mockReturnValue(userDto);
    userRepositoryMock.save.mockResolvedValue(userDto);

    // const profile = new ProfileEntity();

    // profileRepositoryMock.create.mockReturnValue(profile);
    // profileRepositoryMock.save.mockResolvedValue(profile);

    try {
      const result = await createUserCommand.execute(user);

      expect(userRepositoryMock.create).toHaveBeenCalledWith(userDto);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
      // expect(profileRepositoryMock.create).toHaveBeenCalledWith({
      //   userId: user.id,
      // });
      // expect(profileRepositoryMock.save).toHaveBeenCalledWith(profile);
      expect(result).toEqual(user);
    } catch (error) {
      console.error('Error during test execution:', error);
    }
  });
});
