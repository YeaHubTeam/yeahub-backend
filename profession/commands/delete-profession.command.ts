import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteProfessionCommand {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(id: string): Promise<number> {
    const deletedProfession = await this.professionRepository.findOne({
      where: { id },
    });

    if (!deletedProfession)
      throw new BadRequestException('This profession is not exist');

    return (await this.professionRepository.delete(id)).affected;
  }
}
