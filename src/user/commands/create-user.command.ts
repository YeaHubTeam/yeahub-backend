import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';
import { ProfileEntity } from '../profile.entity';

@Injectable()
export class CreateUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const connection = this.usersRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    return queryRunner
      .connect()
      .then(() => queryRunner.startTransaction())
      .then(async () => {
        const user = this.usersRepository.create(createUserDto);
        return queryRunner.manager
          .save(UserEntity, user)
          .then(async (savedUser) => {
            const profile = new ProfileEntity();
            profile.userId = savedUser.id;

            return queryRunner.manager.save(ProfileEntity, profile).then(() => {
              savedUser.profile = profile;
              return queryRunner.manager.save(UserEntity, savedUser);
            });
          });
      })
      .then(async (updatedUser) => {
        await queryRunner.commitTransaction();
        return updatedUser;
      })
      .catch(async (error) => {
        await queryRunner.rollbackTransaction();
        throw error;
      })
      .finally(async () => {
        await queryRunner.release();
      });
  }
}
