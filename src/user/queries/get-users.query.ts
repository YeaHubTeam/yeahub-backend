import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/src';
import { Repository } from 'typeorm';

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
