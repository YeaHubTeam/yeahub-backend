import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [TypeormModule, UserModule, SkillModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
