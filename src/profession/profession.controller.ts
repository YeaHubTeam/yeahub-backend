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
import {
  CreateDecorator,
  GetDecoratorByTitle,
  GerALLDecorator,
  GetDecoratorByID,
  UpdateDecoratorByID,
  DeleteDecorator,
} from './decorators/custom-profession.decorator';

@ApiTags('professions')
@Controller('professions')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Get()
  @GerALLDecorator()
  async getAllProfessions() {
    return await this.professionService.getAllProfessions();
  }

  @Get('profession')
  @GetDecoratorByTitle()
  async getProfessionByTitle(
    @Query('prof_title') profTitle: string,
  ): Promise<ProfessionEntity[] | []> {
    try {
      return await this.professionService.getProfessionByTitle(profTitle);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  @GetDecoratorByID()
  async getProfessionById(@Param('id') id: string): Promise<ProfessionEntity> {
    try {
      return await this.professionService.getProfessionById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @CreateDecorator()
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
  @UpdateDecoratorByID()
  async updateProfession(
    @Param('id') id: string,
    @Body() updateProfessionDto: UpdateProfessionDto,
  ): Promise<number> {
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
  @DeleteDecorator()
  async removeProfession(@Param('id') id: string): Promise<number> {
    try {
      return await this.professionService.removeProfession(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
