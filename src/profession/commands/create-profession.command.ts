import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessionDto } from '../dto/create-profession.dto';
import { ProfessionEntity } from '../entities/profession.entity';

@Injectable()
export class CreateProfessionCommand {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(
    createProfessionDto: CreateProfessionDto,
  ): Promise<ProfessionEntity> {
    const profession = this.professionRepository.create(createProfessionDto);

    if (!profession) throw new BadRequestException('Something went wrong');

    await this.professionRepository.save(profession);

    return profession;
  }
}
