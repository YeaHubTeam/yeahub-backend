import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionEntity } from '../entities/profession.entity';

@Injectable()
export class GetProfessionsQuery {
  constructor(
    @InjectRepository(ProfessionEntity)
    private professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(): Promise<ProfessionEntity[]> {
    return await this.professionRepository.find();
  }
}
