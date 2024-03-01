import { UserEntity } from './user/user.entity';
import { QuestionEntity } from './question/question.entity';

export * from './user/user.entity';
export * from './question/question.entity';

export const ENTITIES = [UserEntity, QuestionEntity];
