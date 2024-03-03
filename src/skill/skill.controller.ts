import { Body, Controller, Get, Post } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillEntity } from './entities/skill.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateSkillApiDocs } from './decorators/create-skill.decorator';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(): Promise<SkillEntity[]> {
    return this.skillService.getSkills();
  }

  @Post()
  @CreateSkillApiDocs()
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.createSkill(createSkillDto);
  }
}
