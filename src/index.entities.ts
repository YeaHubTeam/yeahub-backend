import { ProfileEntity } from './profile/entities/profile.entity';
import { UserEntity } from './user/entities/user.entity';
import { QuestionEntity } from './question/question.entity';

export * from './user/entities/user.entity';
export * from './profile/entities/profile.entity';
export * from './question/question.entity';

export const ENTITIES = [UserEntity, ProfileEntity, QuestionEntity];
