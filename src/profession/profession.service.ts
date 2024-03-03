import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionEntity } from './entities/profession.entity';
import { GetProfessionsQuery } from './queries';
import { CreateProfessionCommand } from './commands';
import { UpdateProfessionCommand } from './commands/update-profession.command';
import { DeleteProfessionCommand } from './commands/delete-profession.command';
import { GetProfessionByTitleCommand } from './commands/get-profession-by-title.command';
import { GetProfessionByIdCommand } from './commands/get-profession-by-id.command';

@Injectable()
export class ProfessionService {
  constructor(
    private getProfessionCommand: GetProfessionsQuery,
    private getProfessionByTitleCommand: GetProfessionByTitleCommand,
    private getProfessionByIdCommand: GetProfessionByIdCommand,
    private createProfessionCommand: CreateProfessionCommand,
    private updateProfessionCommand: UpdateProfessionCommand,
    private deleteProfessionCommand: DeleteProfessionCommand,
  ) {}

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
  }

  async getAllProfessions(): Promise<ProfessionEntity[]> {
    return await this.getProfessionCommand.execute();
  }

  async getProfessionById(id: string): Promise<ProfessionEntity> {
    return await this.getProfessionByIdCommand.execute(id);
  }

  async getProfessionByTitle(
    profTitle: string,
  ): Promise<ProfessionEntity[] | []> {
    return await this.getProfessionByTitleCommand.execute(profTitle);
  }

  async updateProfession(
    id: string,
    updateProfessionDto: UpdateProfessionDto,
  ): Promise<number> {
    return await this.updateProfessionCommand.execute(id, updateProfessionDto);
  }

  async removeProfession(id: string): Promise<number> {
    return await this.deleteProfessionCommand.execute(id);
  }
}
