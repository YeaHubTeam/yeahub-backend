import { Test } from '@nestjs/testing';
import { CreateQuestionCommand } from '../commands/create-question.command'
import { QuestionEntity } from '../question.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';

describe('CreateQuestionCommand', () => {
  let createQuestionCommand: CreateQuestionCommand;
  let questionRepositoryMock: Partial<
    Record<keyof Repository<QuestionEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    questionRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateQuestionCommand,
        {
          provide: getRepositoryToken(QuestionEntity),
          useValue: questionRepositoryMock,
        },
      ],
    }).compile();

    createQuestionCommand = moduleRef.get<CreateQuestionCommand>(
      CreateQuestionCommand,
    );
  });

  it('должен создать вопрос', async () => {
    const createQuestionDto: CreateQuestionDto = {
      title: 'Promise',
      description: 'What is Promise?',
      imageSrc: 'http://example.com/avatar.jpg',
      keywords: ['JavaScript'],
      shortAnswer: 'test',
      status: 'draft',
      rate: 3,
      longAnswer: 'test',
    };

    const question = new QuestionEntity();
    Object.assign(question, createQuestionDto);

    questionRepositoryMock.create.mockReturnValue(question);
    questionRepositoryMock.save.mockReturnValue(question);

    const result = await createQuestionCommand.execute(createQuestionDto);

    expect(questionRepositoryMock.create).toHaveBeenCalledWith(
      createQuestionDto,
    );
    expect(questionRepositoryMock.save).toHaveBeenCalledWith(question);
    expect(result).toEqual(question);
  });
});
