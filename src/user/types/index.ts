import { UserEntity } from '@/user/entities/user.entity';

export type UserEntityPublic = Omit<UserEntity, 'passwordHash'>;
