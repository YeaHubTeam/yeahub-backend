import { HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function DeleteProfessionApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete profession via id' }),
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid id',
    }),
  );
}
