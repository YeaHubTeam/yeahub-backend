import { FindUserById } from './get-user.query';
import { GetUsersQuery } from './get-users.query';

export * from './get-users.query';

export const USERS_QUERIES = [GetUsersQuery, FindUserById];
