import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from '../question.controller';
import { QuestionService } from '../question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';

describe('QuestionController', () => {
  let questionController: QuestionController;
  let questionService: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            createQuestion: jest.fn((dto) => dto),
          },
        },
      ],
    }).compile();

    questionController = module.get<QuestionController>(QuestionController);
    questionService = module.get<QuestionService>(QuestionService);
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

    expect(await questionController.createQuestion(createQuestionDto)).toEqual(
      createQuestionDto,
    );
    expect(questionService.createQuestion).toHaveBeenCalledWith(
      createQuestionDto,
    );
  });
});
