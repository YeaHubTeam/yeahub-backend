import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function GetProfilesApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Profiles successfully found',
      schema: {
        example: [
          {
            id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
            userId: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
            user: {
              id: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
              firstName: 'test',
              lastName: 'test',
              avatarUrl: 'http://example.com/avatar.jpg',
              createdAt: '2024-02-18T09:28:38.752Z',
              updatedAt: '2024-02-18T09:28:38.752Z',
            },
          },
        ],
      },
    }),
  );
}
