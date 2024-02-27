import { AuthTokenDto, UserLoginDto } from '@/auth/types';

export const userLoginMock: UserLoginDto = {
  username: 'mock-user@mock',
  password: 'pwd-1234#secure',
};

export const authTokensMock: AuthTokenDto = {
  access_token: 'access_token112233333',
  refresh_token: 'access_token112233333',
};
