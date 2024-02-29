import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class GetProfilesQuery {
  constructor(
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
  ) {}

  async execute() {
    return await this.profilesRepository.find({
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          country: true,
          city: true,
          birthday: true,
          address: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      relations: {
        user: true,
      },
    });
  }
}
