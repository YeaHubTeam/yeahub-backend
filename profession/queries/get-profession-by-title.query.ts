import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionEntity } from '../entities/profession.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GetProfessionByTitleQuery {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(title: string): Promise<ProfessionEntity[]> {
    return await this.professionRepository.find({
      where: { title: Like('%' + title + '%') },
    });
  }
}
