import { GetUsersQuery } from './get-users.query';
import { FindUserByIdQuery } from '@/user/queries/find-user-by-id.query';
import { FindUserByEmailQuery } from '@/user/queries/find-user-by-email.query';
import { UpdateUserByIdQuery } from '@/user/queries/update-user-by-id.query';

export * from './get-users.query';
export * from './find-user-by-id.query';

export const USERS_QUERIES = [
  GetUsersQuery,
  FindUserByIdQuery,
  FindUserByEmailQuery,
  UpdateUserByIdQuery,
];
