import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateQuestionApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new question' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The question has been successfully created.',
      schema: {
        example: {
          title: 'Event loop',
          description: 'What is Event Loop?',
          imageSrc: 'http://example.com/avatar.jpg',
          keywords: ['JavaScript'],
          shortAnswer: 'test',
          status: 'public',
          rate: 3,
          longAnswer: 'test',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
  );
}
