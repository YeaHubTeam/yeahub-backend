import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { SkillEntity } from '../skill.entity';

@Injectable()
export class CreateSkillCommand {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillsRepository: Repository<SkillEntity>,
  ) {}

  async execute(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    const skill = this.skillsRepository.create(createSkillDto);
    await this.skillsRepository.save(skill);

    return skill;
  }
}
