import { HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function GetProfessionByTitleApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get professions by title' }),
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Description',
      schema: {
        example: [
          {
            title: 'Backend developer',
            description: 'Work with Databases',
            skills: [
              '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
              '62c2b0c3-4d8b-482b-92f0-65b3e262716b',
            ],
            image_src: '',
            keywords: ['Development', 'Web developer'],
          },
        ],
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
  );
}
