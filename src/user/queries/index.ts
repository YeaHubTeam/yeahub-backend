import { FindUserByIdQuery } from './find-user-by-id.query';
import { GetUsersQuery } from './get-users.query';

export * from './get-users.query';

export const USERS_QUERIES = [GetUsersQuery, FindUserByIdQuery];
