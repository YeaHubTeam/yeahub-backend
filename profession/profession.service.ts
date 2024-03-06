import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionEntity } from './entities/profession.entity';
import { GetProfessionsQuery } from './queries';
import { CreateProfessionCommand } from './commands';
import { UpdateProfessionCommand } from './commands/update-profession.command';
import { DeleteProfessionCommand } from './commands/delete-profession.command';
import { GetProfessionByTitleQuery } from './queries/get-profession-by-title.query';
import { GetProfessionByIdQuery } from './queries/get-profession-by-id.query';

@Injectable()
export class ProfessionService {
  constructor(
    private getProfessionQuery: GetProfessionsQuery,
    private getProfessionByIdQuery: GetProfessionByIdQuery,
    private getProfessionByTitleQuery: GetProfessionByTitleQuery,
    private createProfessionCommand: CreateProfessionCommand,
    private updateProfessionCommand: UpdateProfessionCommand,
    private deleteProfessionCommand: DeleteProfessionCommand,
  ) {};

  async createProfession(
    createProfessionDto: CreateProfessionDto,
  ): Promise<CreateProfessionDto> {
    const { title, description, skills, image_src, keywords } =
      createProfessionDto;

    const newProfession = {
      title,
      description,
      skills,
      image_src,
      keywords,
    };

    if (!newProfession || createProfessionDto === null)
      throw new BadRequestException(
        'Something went wrong in create Profession...',
      );

    return await this.createProfessionCommand.execute(newProfession);
  };

  async getAllProfessions(): Promise<ProfessionEntity[]> {
    return await this.getProfessionQuery.execute();
  };

  async getProfessionById(id: string): Promise<ProfessionEntity> {
    return await this.getProfessionByIdQuery.execute(id);
  };

  async getProfessionByTitle(profTitle: string): Promise<ProfessionEntity[]> {
    return await this.getProfessionByTitleQuery.execute(profTitle);
  };

  async updateProfession(
    id: string,
    updateProfessionDto: UpdateProfessionDto,
  ): Promise<ProfessionEntity> {
    return await this.updateProfessionCommand.execute(id, updateProfessionDto);
  };

  async removeProfession(id: string): Promise<number> {
    return await this.deleteProfessionCommand.execute(id);
  };
};