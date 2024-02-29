import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Injectable()
export class CreateUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const connection = this.usersRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = this.usersRepository.create(createUserDto);
      const savedUser = await queryRunner.manager.save(UserEntity, user);

      const profile = new ProfileEntity();
      profile.userId = savedUser.id;

      await queryRunner.manager.save(ProfileEntity, profile);

      savedUser.profile = profile;
      const updatedUser = await queryRunner.manager.save(UserEntity, savedUser);

      await queryRunner.commitTransaction();
      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
