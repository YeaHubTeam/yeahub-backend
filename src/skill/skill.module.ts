import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './skill.entity';
import { SKILLS_QUERIES } from './queries';
import { SKILLS_COMMANDS } from './commands';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillService, ...SKILLS_COMMANDS, ...SKILLS_QUERIES],
  controllers: [SkillController],
  exports: [TypeOrmModule, SkillService],
})
export class SkillModule {}
