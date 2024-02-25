import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { ProfileEntity } from 'src/profile/entities/profile.entity';

@Injectable()
export class GetUserProfileQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(userId: string): Promise<ProfileEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.profile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
