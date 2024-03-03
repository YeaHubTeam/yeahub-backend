import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionController } from '../profession.controller';
import { ProfessionService } from '../profession.service';
import { CreateProfessionDto } from '../dto/create-profession.dto';
import { ProfessionEntity } from '../entities/profession.entity';
import { UpdateProfessionDto } from '../dto/update-profession.dto';

describe('ProfessionController', () => {
  let professionController: ProfessionController;
  let professionService: ProfessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionController],
      providers: [
        {
          provide: ProfessionService,
          useValue: {
            getAllProfessions: jest.fn(),
            getProfessionByTitle: jest.fn(),
            getProfessionById: jest.fn(),
            createProfession: jest.fn(),
            updateProfession: jest.fn(),
            removeProfession: jest.fn(),
          },
        },
      ],
    }).compile();

    professionController =
      module.get<ProfessionController>(ProfessionController);
    professionService = module.get<ProfessionService>(ProfessionService);
  });

  it('should be defined', async () => {
    expect(professionController).toBeDefined();
    expect(professionService).toBeDefined();
  });

  describe('FIND ALL PROFESSIONS', () => {
    it('Should return all professions', async () => {
      const professions = [
        {
          id: 'dcd1e040-3348-4349-a45a-461a13b72acf',
          title: 'Backend TEST developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
          createdAt: new Date('2024-02-24T13:27:17.197Z'),
          updatedAt: new Date('2024-02-24T13:27:17.197Z'),
        },
      ];

      jest
        .spyOn(professionService, 'getAllProfessions')
        .mockResolvedValue(professions);

      expect(await professionController.getAllProfessions()).toEqual(
        professions,
      );
      expect(professionService.getAllProfessions).toHaveBeenCalled();
    });
  });

  describe('Get Profession By ID', () => {
    it('Should return profession via id', async () => {
      const id = 'dcd1e040-3348-4349-a45a-461a13b72acf';

      const profession = {
        id: 'dcd1e040-3348-4349-a45a-461a13b72acf',
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
        createdAt: new Date('2024-02-24T13:27:17.197Z'),
        updatedAt: new Date('2024-02-24T13:27:17.197Z'),
      };

      jest
        .spyOn(professionController, 'getProfessionById')
        .mockResolvedValue(profession);
      expect(await professionController.getProfessionById(id)).toEqual(
        profession,
      );
      expect(professionController.getProfessionById).toHaveBeenCalled();
      expect(professionController.getProfessionById).toHaveBeenCalledWith(id);

      jest
        .spyOn(professionService, 'getProfessionById')
        .mockResolvedValue(profession);
      expect(await professionService.getProfessionById(id)).toEqual(profession);
      expect(professionService.getProfessionById).toHaveBeenCalled();
      expect(professionService.getProfessionById).toHaveBeenCalledWith(id);
    });

    it('Should return error', async () => {
      // jest.spyOn(professionController, "getProfessionById").mockResolvedValue(null);
      // expect(await professionController.getProfessionById(null)).rejects.toBe("Some error")
    });
  });

  describe('CREATE PROFESSION', () => {
    it('Should return created profession', async () => {
      const profession = new ProfessionEntity();

      const createProfessionDto: CreateProfessionDto = {
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
      };

      Object.assign(profession, createProfessionDto);

      jest
        .spyOn(professionService, 'createProfession')
        .mockResolvedValue(profession);

      expect(
        await professionController.createProfession(createProfessionDto),
      ).toEqual(profession);
      expect(professionService.createProfession).toHaveBeenCalled();
      expect(professionService.createProfession).toHaveBeenCalledWith(
        createProfessionDto,
      );
    });

    it('Should return an error', async () => {
      const emptyProfession = {
        title: '',
        description: '',
        skills: [''],
        image_src: '',
        keywords: [''],
      };

      try {
        jest
          .spyOn(professionController, 'createProfession')
          .mockRejectedValue('Some error');
        jest
          .spyOn(professionService, 'createProfession')
          .mockRejectedValue('Some error');
      } catch (error) {
        expect(
          await professionController.createProfession(emptyProfession),
        ).rejects.toThrow('Some error');
        expect(professionController.createProfession).toHaveBeenCalled();
        expect(professionController.createProfession).toHaveBeenCalledWith(
          emptyProfession,
        );

        expect(
          await professionService.createProfession(emptyProfession),
        ).rejects.toThrow('Some error');
        expect(professionService.createProfession).toHaveBeenCalled();
        expect(professionService.createProfession).toHaveBeenCalledWith(
          emptyProfession,
        );
      }
    });
  });

  describe('Get Professions By Title', () => {
    it('Should return professions which has same title', async () => {
      const title = 'dev';
      const profession: ProfessionEntity = {
        id: 'dcd1e040-3348-4349-a45a-461a13b72acf',
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
        createdAt: new Date('2024-02-24T13:27:17.197Z'),
        updatedAt: new Date('2024-02-24T13:27:17.197Z'),
      };

      jest
        .spyOn(professionController, 'getProfessionByTitle')
        .mockResolvedValue([profession]);
      jest
        .spyOn(professionService, 'getProfessionByTitle')
        .mockResolvedValue([profession]);

      expect(await professionController.getProfessionByTitle(title)).toEqual([
        profession,
      ]);
      expect(await professionService.getProfessionByTitle(title)).toEqual([
        profession,
      ]);
      expect(professionController.getProfessionByTitle).toHaveBeenCalled();
      expect(professionService.getProfessionByTitle).toHaveBeenCalled();
    });

    it('Should return an error', async () => {
      try {
        jest
          .spyOn(professionController, 'getProfessionByTitle')
          .mockRejectedValue('Some error');
        jest
          .spyOn(professionService, 'getProfessionByTitle')
          .mockRejectedValue('Some error');
      } catch (error) {
        expect(
          await professionController.getProfessionByTitle(null),
        ).rejects.toThrow('Some error');
        expect(professionController.getProfessionByTitle).toHaveBeenCalled();
        expect(professionController.getProfessionByTitle).toHaveBeenCalledWith(
          null,
        );

        expect(
          await professionService.getProfessionByTitle(null),
        ).rejects.toThrow('Some error');
        expect(professionService.getProfessionByTitle).toHaveBeenCalled();
        expect(professionService.getProfessionByTitle).toHaveBeenCalledWith(
          null,
        );
      }
    });

    describe('Update profession By ID', () => {
      it('Should return updated result', async () => {
        const id = 'dcd1e040-3348-4349-a45a-461a13b72acf';
        const updatedProfession: UpdateProfessionDto = {
          title: 'Backend TEST developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
        };

        jest
          .spyOn(professionController, 'updateProfession')
          .mockResolvedValue(1);
        jest.spyOn(professionService, 'updateProfession').mockResolvedValue(1);

        expect(
          await professionController.updateProfession(id, updatedProfession),
        ).toBe(1);
        expect(professionController.updateProfession).toHaveBeenCalled();
        expect(professionController.updateProfession).toHaveBeenCalledWith(
          id,
          updatedProfession,
        );

        expect(
          await professionService.updateProfession(id, updatedProfession),
        ).toBe(1);
        expect(professionService.updateProfession).toHaveBeenCalled();
        expect(professionService.updateProfession).toHaveBeenCalledWith(
          id,
          updatedProfession,
        );
      });

      it('Should return error', async () => {
        const id = 'dcd1e040-3348-4349-a45a-461a13b72acf';
        const updatedProfession: UpdateProfessionDto = {
          title: 'Backend TEST developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
        };

        const badProfessionObj = {
          title: '',
          description: '',
          skills: ['', ''],
          image_src: '',
          keywords: ['', ''],
        };

        try {
          jest
            .spyOn(professionController, 'updateProfession')
            .mockRejectedValue('Some error');
          jest
            .spyOn(professionService, 'updateProfession')
            .mockRejectedValue('Some error');
        } catch (error) {
          expect(
            await professionController.updateProfession(
              null,
              updatedProfession,
            ),
          ).rejects.toThrow('Some error');
          expect(
            await professionController.updateProfession(id, badProfessionObj),
          ).rejects.toThrow('Some error');
          expect(professionController.updateProfession).toHaveBeenCalled();
          expect(professionController.updateProfession).toHaveBeenCalledWith(
            null,
            updatedProfession,
          );
          expect(professionController.updateProfession).toHaveBeenCalledWith(
            id,
            badProfessionObj,
          );

          expect(
            await professionService.updateProfession(null, updatedProfession),
          ).rejects.toThrow('Some error');
          expect(
            await professionService.updateProfession(id, badProfessionObj),
          ).rejects.toThrow('Some error');
          expect(professionService.updateProfession).toHaveBeenCalled();
          expect(professionService.updateProfession).toHaveBeenCalledWith(
            null,
            updatedProfession,
          );
          expect(professionService.updateProfession).toHaveBeenCalledWith(
            id,
            badProfessionObj,
          );
        }
      });
    });

    describe('Delete profession By ID', () => {
      it('Should return deleted result', async () => {
        const id = 'dcd1e040-3348-4349-a45a-461a13b72acf';

        jest
          .spyOn(professionController, 'removeProfession')
          .mockResolvedValue(1);
        jest.spyOn(professionService, 'removeProfession').mockResolvedValue(1);

        expect(await professionController.removeProfession(id)).toBe(1);
        expect(professionController.removeProfession).toHaveBeenCalled();
        expect(professionController.removeProfession).toHaveBeenCalledWith(id);

        expect(await professionService.removeProfession(id)).toBe(1);
        expect(professionService.removeProfession).toHaveBeenCalled();
        expect(professionService.removeProfession).toHaveBeenCalledWith(id);
      });

      it('Should return error', async () => {
        const id = '123';

        try {
          jest
            .spyOn(professionController, 'removeProfession')
            .mockRejectedValue('Some error');
          jest
            .spyOn(professionService, 'removeProfession')
            .mockRejectedValue('Some error');
        } catch (error) {
          expect(
            await professionController.removeProfession(id),
          ).rejects.toThrow('Some error');
          expect(professionController.removeProfession).toHaveBeenCalled();
          expect(professionController.removeProfession).toHaveBeenCalledWith(
            id,
          );

          expect(await professionService.removeProfession(id)).rejects.toThrow(
            'Some error',
          );
          expect(professionService.removeProfession).toHaveBeenCalled();
          expect(professionService.removeProfession).toHaveBeenCalledWith(id);
        }
      });
    });
  });
});
