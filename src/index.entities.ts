import { ProfileEntity } from './profile/entities/profile.entity';
import { UserEntity } from './user/entities/user.entity';

export * from './user/entities/user.entity';
export * from './profile/entities/profile.entity';

export const ENTITIES = [UserEntity, ProfileEntity];
