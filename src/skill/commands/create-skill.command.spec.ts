import { Test } from '@nestjs/testing';
import { CreateSkillCommand } from './create-skill.command';
import { SkillEntity } from '../entities/skill.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreateSkillCommand', () => {
  let createSkillCommand: CreateSkillCommand;
  let skillRepositoryMock: Partial<
    Record<keyof Repository<SkillEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    skillRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateSkillCommand,
        {
          provide: getRepositoryToken(SkillEntity),
          useValue: skillRepositoryMock,
        },
      ],
    }).compile();

    createSkillCommand = moduleRef.get<CreateSkillCommand>(CreateSkillCommand);
  });

  it('должен создать skill', async () => {
    const skillDto = {
      title: 'JAVA',
      description: 'Very nice',
      imageSrc: 'http://example.com/imageSrc.jpg',
    };

    const skill = new SkillEntity();
    Object.assign(skill, skillDto);

    skillRepositoryMock.create.mockReturnValue(skill);
    skillRepositoryMock.save.mockResolvedValue(skill);

    const result = await createSkillCommand.execute(skillDto);

    expect(skillRepositoryMock.create).toHaveBeenCalledWith(skillDto);
    expect(skillRepositoryMock.save).toHaveBeenCalledWith(skill);
    expect(result).toEqual(skill);
  });
});
