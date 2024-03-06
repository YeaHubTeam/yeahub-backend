import { HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function GetProfessionsApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get all professions' }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Something went wrong 500 error',
    }),
  );
}
