import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class RemoveUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.delete(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
