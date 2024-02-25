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

  async execute() {
    const profiles = await this.profilesRepository.find({
      relations: ['user'],
    });

    return profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      user: {
        id: profile.user.id,
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
        avatarUrl: profile.user.avatarUrl,
        createdAt: profile.user.createdAt,
        updatedAt: profile.user.updatedAt,
      },
    }));
  }
}
