import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateSkillApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new skill' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The skill has been successfully created.',
      schema: {
        example: {
          title: 'JAVA',
          description: 'Very nice',
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
      description: 'Skill already exists',
    }),
  );
}
