import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionEntity } from '../entities/profession.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GetProfessionByTitleCommand {
  constructor(
    @InjectRepository(ProfessionEntity)
    private readonly professionRepository: Repository<ProfessionEntity>,
  ) {}

  async execute(profTitle: string): Promise<ProfessionEntity[] | []> {
    return await this.professionRepository.find({
      where: { title: Like('%' + profTitle + '%') },
    });
  }
}
