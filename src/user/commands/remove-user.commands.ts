import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';


@Injectable()
export class RemoveUserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async execute(userId: string): Promise<void> {
    const connection = this.usersRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    return queryRunner
      .connect()
      .then(() => queryRunner.startTransaction())
      .then(async () => {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['profile'],
          });

        if (!user) {
          throw new NotFoundException('User not found');
        }
        const profile = await connection.getRepository(ProfileEntity).findOne({
            where: {
              userId: user.id,
            },
          });

        if (profile) {
          await queryRunner.manager.delete(ProfileEntity, profile.id);
        }
        await queryRunner.manager.delete(UserEntity, user.id);
      })
      .then(async () => {
        await queryRunner.commitTransaction();
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