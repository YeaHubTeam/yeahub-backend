import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './question.entity';
import { GetQuestionsQuery } from './queries';
import { CreateQuestionCommand } from './commands';

@Injectable()
export class QuestionService {
  constructor(
    private getQuestionsQuery: GetQuestionsQuery,
    private createQuestionCommand: CreateQuestionCommand,
  ) {}

  createQuestion(createQuestionDto: CreateQuestionDto) {
    return this.createQuestionCommand.execute(createQuestionDto);
  }

  getQuestions(): Promise<QuestionEntity[]> {
    return this.getQuestionsQuery.execute();
  }
}
