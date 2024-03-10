import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { authTokensMock, userLoginMock } from '@/auth/constants';
import { userMock } from '@/user/constant';

export function LoginApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user' }),
    ApiResponse({
      status: 200,
      description: 'Authentication successful',
      schema: { example: authTokensMock },
    }),
    ApiBody({ schema: { example: userLoginMock } }),
  );
}

export function ProfileApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Getting user profile' }),
    ApiResponse({
      status: 200,
      description: 'User profile retrieved successfully',
      schema: { example: userMock },
    }),
    ApiBearerAuth(),
  );
}

export function RefreshApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh authentication token' }),
    ApiResponse({
      status: 200,
      description: 'Token refreshed successfully',
      schema: { example: authTokensMock },
    }),
  );
}

export function LogoutApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Logout user' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'User logged out successfully' }),
  );
}
