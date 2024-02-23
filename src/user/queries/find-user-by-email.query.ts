import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { Nullable } from '@/common/utility-types';

@Injectable()
export class FindUserByEmailQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(email: UserEntity['email']): Promise<Nullable<UserEntity>> {
    return await this.usersRepository.findOneBy({ email });
  }
}
