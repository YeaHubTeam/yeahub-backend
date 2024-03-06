import { HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function CreateProfessionApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create profession' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Description',
      schema: {
        example: {
          title: 'Backend developer',
          description: 'Work with Databases',
          skills: [
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
          ],
          image_src: '',
          keywords: ['Development', 'Web developer'],
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: "You're not authorized",
    }),
  );
}
