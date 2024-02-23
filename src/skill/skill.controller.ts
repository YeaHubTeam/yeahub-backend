import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillEntity } from './skill.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async findAll(): Promise<SkillEntity[]> {
    return this.skillService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The skill has been successfully created.',
    schema: {
      example: {
        title: 'JAVA',
        description: '',
        avatarUrl: 'http://example.com/avatar.jpg',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Skill already exists',
  })
  create(@Body() skillDto: CreateSkillDto) {
    return this.skillService.create(skillDto);
  }
}
