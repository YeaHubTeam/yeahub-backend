import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PublicUserDto } from '../dto';

@Injectable()
export class GetUsersQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(): Promise<PublicUserDto[]> {
    const users = await this.usersRepository.find({
      relations: ['profile'],
    });
    return users.map((user) => new PublicUserDto(user));
  }
}
