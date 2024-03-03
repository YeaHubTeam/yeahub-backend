import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto, PublicUserDto } from '../dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn((dto) => dto),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return a PublicUserDto without password when creating a user', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '1234567890',
      email: 'ivan.ivanov@example.com',
      passwordHash: 'hashPassword',
      country: 'Country',
      city: 'City',
      birthday: new Date(),
      address: '123 Main St',
      avatarUrl: 'http://example.com/avatar.jpg',
    };
    const publicUserDto: PublicUserDto = {
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

    jest.spyOn(userService, 'createUser').mockResolvedValue(publicUserDto);

    const result = await userController.createUser(createUserDto);

    expect(result).toBe(publicUserDto);
  });
});
