import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nullable } from '@/common/utility-types';
import { UserEntity } from '@/user/entities/user.entity';

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
