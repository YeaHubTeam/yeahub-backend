import { ProfileEntity } from './profile/entities/profile.entity';
import { UserEntity } from './user/user.entity';

export * from './user/user.entity';
export * from './profile/entities/profile.entity';

export const ENTITIES = [UserEntity, ProfileEntity];
