import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { QUESTIONS_QUERIES } from './queries';
import { QUESTIONS_COMMANDS } from './commands';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService, ...QUESTIONS_QUERIES, ...QUESTIONS_COMMANDS],
  exports: [TypeOrmModule, QuestionService],
})
export class QuestionModule {}
