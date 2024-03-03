import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetProfessionsQuery } from '../queries/get-professions.query';

describe('GetProfesstionCommand', () => {
  let getProfesssionQuery: GetProfessionsQuery;
  let professionRepositoryMock: Partial<
    Record<keyof Repository<ProfessionEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    professionRepositoryMock = {
      find: jest.fn(),
      findBy: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetProfessionsQuery,
        {
          provide: getRepositoryToken(ProfessionEntity),
          useValue: professionRepositoryMock,
        },
      ],
    }).compile();

    getProfesssionQuery =
      moduleRef.get<GetProfessionsQuery>(GetProfessionsQuery);
  });

  it('Should be defined', async () => {
    expect(getProfesssionQuery).toBeDefined();
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
});
