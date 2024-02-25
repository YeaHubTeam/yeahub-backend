import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

type ProfileEntity = {
  userId: string;
  id: string;
};

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
            create: jest.fn((dto) => dto),
            findProfileByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('должен создать пользователя', async () => {
    const createUserDto: CreateUserDto = {
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

    expect(await userController.create(createUserDto)).toEqual(createUserDto);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });

  describe('getUserProfile', () => {
    it('должен выводить профиль пользователя по его id', async () => {
      const userId = 'testId';
      const expectedProfile: ProfileEntity = {
        userId: userId,
        id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
      };

      const userServiceMock = {
        findProfileByUserId: jest.fn().mockResolvedValue(expectedProfile),
      };

      jest.spyOn(userServiceMock, 'findProfileByUserId');

      const userController = new UserController(userServiceMock as any);
      const result = await userController.getUserProfile(userId);

      expect(result).toEqual(expectedProfile);
      expect(userServiceMock.findProfileByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
