import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
      description: 'User data already exists',
    }),
  );
}
