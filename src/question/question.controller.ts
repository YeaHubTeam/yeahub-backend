import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './question.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionApiDocs } from './decorators/create-question.decorator';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(): Promise<QuestionEntity[]> {
    return this.questionService.getQuestions();
  }

  @Post()
  @CreateQuestionApiDocs()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }
}
