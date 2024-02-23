import { Injectable } from '@nestjs/common';
import { SkillEntity } from './skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateSkillCommand } from './commands/create-skill.command';
import { GetSkillsQuery } from './queries/get-skills.query';

@Injectable()
export class SkillService {
  constructor(
    private createSkillCommand: CreateSkillCommand,
    private getSkillsQuery: GetSkillsQuery,
  ) {}

  findAll(): Promise<SkillEntity[]> {
    return this.getSkillsQuery.execute();
  }

  create(skillDto: CreateSkillDto): Promise<SkillEntity> {
    return this.createSkillCommand.execute(skillDto);
  }
}
