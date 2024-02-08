import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';

@Injectable()
export class CreateUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    return user;
  }
}
