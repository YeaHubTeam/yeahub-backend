import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserByIdQuery {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async execute(id: UserEntity['id'], newUser: Partial<UserEntity>) {
    return this.usersRepository.update({ id }, newUser);
  }
}
