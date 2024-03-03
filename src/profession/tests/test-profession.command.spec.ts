import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionEntity } from '../entities/profession.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetProfessionByIdCommand } from '../commands/get-profession-by-id.command';
import { Like, Repository } from 'typeorm';
import { GetProfessionByTitleCommand } from '../commands/get-profession-by-title.command';
import { CreateProfessionCommand } from '../commands/create-profession.command';
import { DeleteProfessionCommand } from '../commands/delete-profession.command';
import { UpdateProfessionCommand } from '../commands/update-profession.command';

describe('Test Profession Commands', () => {
  let createProfessionCommand: CreateProfessionCommand;
  let getProfessionByIdCommand: GetProfessionByIdCommand;
  let getProfessionByTitleCommand: GetProfessionByTitleCommand;
  let updateProfessionCommand: UpdateProfessionCommand;
  let deleteProfesionCommand: DeleteProfessionCommand;
  let professionRepositoryMock: Partial<
    Record<keyof Repository<ProfessionEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    professionRepositoryMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetProfessionByIdCommand,
        GetProfessionByTitleCommand,
        CreateProfessionCommand,
        UpdateProfessionCommand,
        DeleteProfessionCommand,
        {
          provide: getRepositoryToken(ProfessionEntity),
          useValue: professionRepositoryMock,
        },
      ],
    }).compile();

    createProfessionCommand = moduleRef.get<CreateProfessionCommand>(
      CreateProfessionCommand,
    );
    getProfessionByTitleCommand = moduleRef.get<GetProfessionByTitleCommand>(
      GetProfessionByTitleCommand,
    );
    getProfessionByIdCommand = moduleRef.get<GetProfessionByIdCommand>(
      GetProfessionByIdCommand,
    );
    updateProfessionCommand = moduleRef.get<UpdateProfessionCommand>(
      UpdateProfessionCommand,
    );
    deleteProfesionCommand = moduleRef.get<DeleteProfessionCommand>(
      DeleteProfessionCommand,
    );
  });

  it('Should be defined', async () => {
    expect(getProfessionByIdCommand).toBeDefined();
    expect(getProfessionByTitleCommand).toBeDefined();
    expect(createProfessionCommand).toBeDefined();
    expect(updateProfessionCommand).toBeDefined();
    expect(deleteProfesionCommand).toBeDefined();
  });

  describe('GET PROFESSION BY ID', () => {
    it('Should return profession by ID', async () => {
      const id = '779a0f1b-ac97-4a4b-9f21-790b21580286';
      const profession = new ProfessionEntity();

      professionRepositoryMock.findOne.mockResolvedValue(profession);

      const result = await getProfessionByIdCommand.execute(
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

      expect(getProfessionByIdCommand.execute(id)).rejects.toThrowError(
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
      const result = await getProfessionByTitleCommand.execute(profTitle);

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
      const result = await getProfessionByTitleCommand.execute(profTitle);

      expect(professionRepositoryMock.find).toHaveBeenCalledWith({
        where: { title: Like(`%${profTitle}%`) },
      });
      expect(result).toEqual(emptyResult);
    });
  });

  describe('CREATE COMMAND', () => {
    it('Should create profession', async () => {
      const professionDto = {
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
      };

      const profEnt = new ProfessionEntity();
      Object.assign(profEnt, professionDto);

      professionRepositoryMock.create.mockReturnValue(profEnt);
      professionRepositoryMock.save.mockResolvedValue(profEnt);

      const result = await createProfessionCommand.execute(professionDto);

      expect(professionRepositoryMock.create).toHaveBeenCalledWith(
        professionDto,
      );
      expect(professionRepositoryMock.save).toHaveBeenCalledWith(professionDto);
      expect(result).toEqual(profEnt);
    });
  });

  describe('UPDATE COMMAND', () => {
    it('Should update profession by ID', async () => {
      const id = '1ed3efc7-672b-47b8-901e-9c9ec34eadc0';

      const profession = new ProfessionEntity();

      const updatedProfessionDto = {
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
      };

      Object.assign(profession, updatedProfessionDto);

      jest
        .spyOn(professionRepositoryMock, 'findOne')
        .mockResolvedValue(profession);
      jest
        .spyOn(professionRepositoryMock, 'update')
        .mockResolvedValue({ affected: 1 });
      const result = await updateProfessionCommand.execute(
        id,
        updatedProfessionDto,
      );

      expect(professionRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(professionRepositoryMock.update).toHaveBeenCalledWith(
        id,
        profession,
      );
      expect(result).toBe(1);
    });

    it('Should return Bad Request Exception', async () => {
      const id = '1ed3efc7-672b-47b8-901e-9c9ec34eadc0';
      const fakeId = '123';
      const updatedProfessionDto = {
        title: 'Backend TEST developer',
        description: 'Work with Databases',
        skills: [
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
        ],
        image_src: '',
        keywords: ['Development', 'Web developer'],
      };

      jest.spyOn(professionRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(
        updateProfessionCommand.execute(fakeId, updatedProfessionDto),
      ).rejects.toThrowError('Something went wrong with update profession');
      await expect(
        updateProfessionCommand.execute(id, null),
      ).rejects.toThrowError('Something went wrong with update profession');
    });
  });

  describe('DELETE COMMAND', () => {
    it('Should delete profession by ID', async () => {
      const id = '1ed3efc7-672b-47b8-901e-9c9ec34eadc0';
      const profession = new ProfessionEntity();
      profession.id = id;

      jest
        .spyOn(professionRepositoryMock, 'delete')
        .mockResolvedValue({ affected: 1 });
      jest
        .spyOn(professionRepositoryMock, 'findOne')
        .mockResolvedValue(profession);

      const result = await deleteProfesionCommand.execute(id);

      expect(professionRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(professionRepositoryMock.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(1);
    });

    it('Should throw BadRequest exception', async () => {
      const id = '123';

      jest.spyOn(professionRepositoryMock, 'findOne').mockResolvedValue(null);
      expect(deleteProfesionCommand.execute(id)).rejects.toThrowError(
        'This profession is not exist',
      );
    });
  });
});
