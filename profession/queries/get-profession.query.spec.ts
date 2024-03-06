import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository, Like } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetProfessionsQuery } from './get-professions.query';
import { GetProfessionByTitleQuery } from './get-profession-by-title.query';
import { GetProfessionByIdQuery } from './get-profession-by-id.query';

describe('GetProfesstionQuery', () => {
  let getProfesssionQuery: GetProfessionsQuery;
  let getProfessionByIdQuery: GetProfessionByIdQuery;
  let getProfessionByTitleQuery: GetProfessionByTitleQuery;
  let professionRepositoryMock: Partial<
    Record<keyof Repository<ProfessionEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    professionRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetProfessionsQuery,
        GetProfessionByTitleQuery,
        GetProfessionByIdQuery,
        {
          provide: getRepositoryToken(ProfessionEntity),
          useValue: professionRepositoryMock,
        },
      ],
    }).compile();

    getProfesssionQuery =
      moduleRef.get<GetProfessionsQuery>(GetProfessionsQuery);

    getProfessionByTitleQuery = moduleRef.get<GetProfessionByTitleQuery>(
      GetProfessionByTitleQuery,
    );

    getProfessionByIdQuery = moduleRef.get<GetProfessionByIdQuery>(
      GetProfessionByIdQuery,
    );
  });

  it('Should be defined', async () => {
    expect(getProfesssionQuery).toBeDefined();
    expect(getProfessionByTitleQuery).toBeDefined();
    expect(getProfessionByIdQuery).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return array of professions', async () => {
      const professions = [
        {
          id: '779a0f1b-ac97-4a4b-9f21-790b21580281',
          title: 'Backend TEST developer',
          description: 'Work with Databases',
          skills: ['62c2b0c3-4d8b-482b-92f0-65b3e262716b'],
          image_src:
            'https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png',
          keywords: ['Communicated'],
        },
      ];

      professionRepositoryMock.find.mockReturnValue(professions);
      const result = await getProfesssionQuery.execute();
      expect(result).toEqual(professions);
    });
  });

  describe('GET PROFESSION BY ID', () => {
    it('Should return profession by ID', async () => {
      const id = '779a0f1b-ac97-4a4b-9f21-790b21580286';
      const profession = new ProfessionEntity();

      professionRepositoryMock.findOne.mockResolvedValue(profession);

      const result = await getProfessionByIdQuery.execute(
        '779a0f1b-ac97-4a4b-9f21-790b21580286',
      );

      expect(professionRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(profession);
    });

    it('Should return empty array if no profession match by ID', async () => {
      const id = '123';

      jest.spyOn(professionRepositoryMock, 'findOne').mockResolvedValue(null);

      expect(getProfessionByIdQuery.execute(id)).rejects.toThrowError(
        'Something went wrong',
      );
    });
  });

  describe('GET PROFESSION BY TITLE', () => {
    it('Should return profession by same title', async () => {
      const profTitle = 'dev';

      const professions = [
        {
          title: 'Backend TEST developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
        },
        {
          title: 'Frontend TEST developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
        },
      ];

      jest
        .spyOn(professionRepositoryMock, 'find')
        .mockResolvedValue(professions);
      const result = await getProfessionByTitleQuery.execute(profTitle);

      expect(professionRepositoryMock.find).toHaveBeenCalledWith({
        where: { title: Like(`%${profTitle}%`) },
      });
      expect(result).toEqual(professions);
    });

    it('Should return ampty array if no profession match by title', async () => {
      const emptyResult = [];
      const profTitle = 'SomeString';

      jest
        .spyOn(professionRepositoryMock, 'find')
        .mockResolvedValue(emptyResult);
      const result = await getProfessionByTitleQuery.execute(profTitle);

      expect(professionRepositoryMock.find).toHaveBeenCalledWith({
        where: { title: Like(`%${profTitle}%`) },
      });
      expect(result).toEqual(emptyResult);
    });
  });
});
