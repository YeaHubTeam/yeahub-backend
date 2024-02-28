import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { SkillModule } from './skill/skill.module';
import { FilterModule } from './filter/filter.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeormModule,
    UserModule,
    FilterModule,
    ConfigModule.forRoot(),
    SkillModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
