import { ProfileEntity } from './user/profile.entity';
import { UserEntity } from './user/user.entity';

export * from './user/user.entity';
export * from './user/profile.entity';

export const ENTITIES = [UserEntity, ProfileEntity];
