import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/profile/entities/profile.entity';

@Injectable()
export class GetUserProfileQuery {
  constructor(private profileRepositry: Repository<ProfileEntity>) {}

  async execute(userId: string): Promise<ProfileEntity> {
    try {
      const user = await this.profileRepositry.findOne({
        where: { id: userId },
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
