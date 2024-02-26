import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { Nullable } from '@/common/utility-types';

@Injectable()
export class FindUserByIdQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(id: UserEntity['id']): Promise<Nullable<UserEntity>> {
    return this.usersRepository.findOneBy({ id });
  }
}
