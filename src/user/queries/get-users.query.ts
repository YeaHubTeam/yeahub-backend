import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class GetUsersQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }
}
