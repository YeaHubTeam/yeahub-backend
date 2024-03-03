import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
