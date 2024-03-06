import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfessionEntity } from './entities/profession.entity';
import { GetProfessionsApiDocs } from './decorators/get-all-professions.decorator';
import { GetProfessionByIdApiDocs } from './decorators/get-profession-by-id.decorator';
import { GetProfessionByTitleApiDocs } from './decorators/get-profession-by-title.decorator';
import { CreateProfessionApiDocs } from './decorators/create-professin.decorator';
import { UpdateProfessionByIdApiDocs } from './decorators/update-profession-by-id.decorator';
import { DeleteProfessionApiDocs } from './decorators/delete-prfession.decorator';

@ApiTags('professions')
@Controller('professions')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Get()
  @GetProfessionsApiDocs()
  async getAllProfessions() {
    return await this.professionService.getAllProfessions();
  }

  @Get('profession')
  @GetProfessionByTitleApiDocs()
  async getProfessionByTitle(
    @Query('prof_title') profTitle: string,
  ): Promise<ProfessionEntity[]> {
    try {
      return await this.professionService.getProfessionByTitle(profTitle);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  @GetProfessionByIdApiDocs()
  async getProfessionById(@Param('id') id: string): Promise<ProfessionEntity> {
    try {
      return await this.professionService.getProfessionById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @CreateProfessionApiDocs()
  async createProfession(
    @Body() createProfessionDto: CreateProfessionDto,
  ): Promise<CreateProfessionDto> {
    try {
      return await this.professionService.createProfession(createProfessionDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  @UpdateProfessionByIdApiDocs()
  async updateProfession(
    @Param('id') id: string,
    @Body() updateProfessionDto: UpdateProfessionDto,
  ): Promise<ProfessionEntity> {
    try {
      return await this.professionService.updateProfession(
        id,
        updateProfessionDto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  @DeleteProfessionApiDocs()
  async removeProfession(@Param('id') id: string): Promise<number> {
    try {
      return await this.professionService.removeProfession(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
