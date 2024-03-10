import { UserEntity } from '@/user/entities/user.entity';
import { Nullable } from '@/common/utility-types';

export interface UserServiceInterface {
  findUserById(id: UserEntity['id']): Promise<Nullable<UserEntity>>;
  findUserByEmail(email: UserEntity['email']): Promise<UserEntity>;
  update(
    userId: UserEntity['id'],
    newUserDto: Partial<UserEntity>,
  ): Promise<void>;
}
