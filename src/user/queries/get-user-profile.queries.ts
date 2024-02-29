import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Injectable()
export class GetUserProfileQuery {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepositry: Repository<ProfileEntity>,
  ) {}

  async execute(userId: string): Promise<ProfileEntity> {
    try {
      const user = await this.profileRepositry.findOne({
        where: { id: userId },
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
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
