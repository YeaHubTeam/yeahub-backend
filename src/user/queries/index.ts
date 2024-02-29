import { GetUserProfileQuery } from './get-user-profile.queries';
import { GetUsersQuery } from './get-users.query';

export * from './get-users.query';
export * from './get-user-profile.queries';

export const USERS_QUERIES = [GetUsersQuery, GetUserProfileQuery];
