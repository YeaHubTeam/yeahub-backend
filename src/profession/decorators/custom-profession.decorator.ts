import { HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function GerALLDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get all professions' }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Something went wrong 500 error', // ????
    }),
  );
}

export function CreateDecorator() {
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

export function GetDecoratorByTitle() {
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

export function GetDecoratorByID() {
  return applyDecorators(
    HttpCode(HttpStatus.ACCEPTED),
    ApiOperation({ summary: 'Get profession by id' }),
    ApiResponse({
      status: HttpStatus.ACCEPTED,
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
      description: 'Bad Request',
    }),
  );
}

export function UpdateDecoratorByID() {
  return applyDecorators(
    ApiOperation({ summary: 'Update profession via id' }),
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Description',
      schema: {
        example: {
          title: 'Backend developer',
          description: 'Work with Databases',
          skills: ['62c2b0c3-4d8b-482b-92f0-65b3e262716b'],
          image_src: '',
          keywords: ['Some keywords...'],
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
  );
}

export function DeleteDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete profession via id' }),
    HttpCode(HttpStatus.OK),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid id',
    }),
  );
}
