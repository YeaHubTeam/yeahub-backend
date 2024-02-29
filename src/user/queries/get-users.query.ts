import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class GetUsersQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['profile'],
      select: {
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
    });
  }
}
