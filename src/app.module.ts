import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { SkillModule } from './skill/skill.module';
import { FilterModule } from './filter/filter.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeormModule,
    UserModule,
    FilterModule,
    QuestionModule,
    ConfigModule.forRoot(),
    SkillModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
