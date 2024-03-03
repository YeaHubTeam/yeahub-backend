import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../question.entity';

@Injectable()
export class GetQuestionsQuery {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async execute(): Promise<QuestionEntity[]> {
    return await this.questionsRepository.find();
  }
}
