import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class GetAllProfilesQuery {
  constructor(
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
  ) {}

  async execute(): Promise<ProfileEntity[]> {
    return await this.profilesRepository.find({
      relations: ['user'],
    });
  }
}
