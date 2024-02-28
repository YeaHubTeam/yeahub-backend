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

  async getSkills(): Promise<SkillEntity[]> {
    return await this.getSkillsQuery.execute();
  }

  async createSkill(CreateSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return await this.createSkillCommand.execute(CreateSkillDto);
  }
}
