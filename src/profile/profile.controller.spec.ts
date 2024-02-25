import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

type ProfileEntity = {
  userId: string;
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findAll: jest.fn(() => []),
          } as any,
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    profileController = module.get<ProfileController>(ProfileController);
  });

  describe('findAll', () => {
    it('должен выводить все профили с определенными полями юзера', async () => {
      const expectedProfiles: ProfileEntity[] = [
        {
          id: '1',
          userId: 'user1',
          user: {
            id: 'userId1',
            firstName: 'John',
            lastName: 'Doe',
            avatarUrl: 'http://example.com/avatar.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      jest.spyOn(profileService, 'findAll').mockResolvedValue(expectedProfiles);

      const result = await profileController.findAll();

      expect(result).toEqual(expectedProfiles);
      expect(profileService.findAll).toHaveBeenCalled();
    });
  });
});
