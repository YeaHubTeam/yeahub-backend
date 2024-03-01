import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class CreateQuestionCommand {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async execute(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const question = this.questionsRepository.create(createQuestionDto);
    await this.questionsRepository.save(question);
    return question;
  }
}
