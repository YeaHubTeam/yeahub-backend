import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository } from 'typeorm';
import { UpdateProfessionDto } from '../dto/update-profession.dto';

@Injectable()
export class UpdateProfessionCommand {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(
    id: string,
    updatedProfessionDto: UpdateProfessionDto,
  ): Promise<number> {
    const findedProfession: ProfessionEntity =
      await this.professionRepository.findOne({ where: { id } });

    if (!findedProfession || !updatedProfessionDto)
      throw new BadRequestException(
        'Something went wrong with update profession',
      );

    return (await this.professionRepository.update(id, updatedProfessionDto))
      .affected;
  }
}
