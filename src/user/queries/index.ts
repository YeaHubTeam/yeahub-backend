import { GetUserProfileQuery } from './get-profiles.queries';
import { GetUsersQuery } from './get-users.query';

export * from './get-users.query';
export * from './get-profiles.queries';

export const USERS_QUERIES = [GetUsersQuery, GetUserProfileQuery];
