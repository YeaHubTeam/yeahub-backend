import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nullable } from '@/common/utility-types';
import { UserEntity } from '@/user/entities/user.entity';

@Injectable()
export class FindUserByEmailQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(email: UserEntity['email']): Promise<Nullable<UserEntity>> {
    return this.usersRepository.findOneBy({ email });
  }
}
