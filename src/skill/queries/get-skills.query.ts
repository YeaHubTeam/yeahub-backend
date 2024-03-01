import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';

@Injectable()
export class GetSkillsQuery {
  constructor(
    @InjectRepository(SkillEntity)
    private skillsRepository: Repository<SkillEntity>,
  ) {}

  async execute(): Promise<SkillEntity[]> {
    return await this.skillsRepository.find();
  }
}
