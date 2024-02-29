import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetUserProfileApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Find profile by userId' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile successfully found',
      schema: {
        example: {
          id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
          userId: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
        },
      },
    }),
  );
}

export function CreateUserApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The user has been successfully created.',
      schema: {
        example: {
          firstName: 'John',
          lastName: 'Doe',
          passwordHash: 'hashed_password_example',
          phone: '+1234567890',
          email: 'john.doe@example.com',
          country: 'USA',
          city: 'New York',
          birthday: '1990-01-01',
          address: '123 Main St',
          avatarUrl: 'http://example.com/avatar.jpg',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Email already exists',
    }),
  );
}

export function RemoveUserApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Delete user with profile by id' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Delete user with profile success',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
  );
}

export function GetUsersApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Find all users' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Users successfully found',
      schema: {
        example: [
          {
            id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
            firstName: 'Ruslan',
            lastname: 'Surname',
            avatarUrl: 'http://example.com/avatar.jpg',
            createdAt: '2024-02-16T10:28:39.072Z',
            updatedAt: '2024-02-16T10:28:39.072Z',
            profile: {
              id: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
            },
          },
        ],
      },
    }),
  );
}
