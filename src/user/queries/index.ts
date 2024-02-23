import { GetUsersQuery } from './get-users.query';
import { FindUserByIdQuery } from '@/user/queries/find-user-by-id.query';
import { FindUserByEmailQuery } from '@/user/queries/find-user-by-email.query';

export * from './get-users.query';

export const USERS_QUERIES = [
  GetUsersQuery,
  FindUserByIdQuery,
  FindUserByEmailQuery,
];
