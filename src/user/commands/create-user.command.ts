import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { PublicUserDto } from '../dto';

@Injectable()
export class CreateUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const connection = this.usersRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = this.usersRepository.create(createUserDto);
      const savedUser = await queryRunner.manager.save(UserEntity, user);

      const profile = new ProfileEntity();

      await queryRunner.manager.save(ProfileEntity, profile);

      savedUser.profile = profile;
      const updatedUser = await queryRunner.manager.save(UserEntity, savedUser);

      await queryRunner.commitTransaction();
      return new PublicUserDto(updatedUser);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException(
          'Unique constraint violation. User with this email already exists.',
        );
      } else {
        throw error;
      }
    } finally {
      await queryRunner.release();
    }
  }
}
