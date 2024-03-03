import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionEntity } from '../entities/profession.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetProfessionByIdCommand {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(id: string): Promise<ProfessionEntity> {
    const profession = await this.professionRepository.findOne({
      where: { id },
    });
    if (!profession) throw new BadRequestException('Something went wrong');
    return profession;
  }
}
