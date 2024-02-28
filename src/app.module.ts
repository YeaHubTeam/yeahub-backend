import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [TypeormModule, UserModule, QuestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
