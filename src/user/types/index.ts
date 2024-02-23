import { UserEntity } from '../user.entity';

export type UserEntityPublic = Omit<UserEntity, 'passwordHash'>;
