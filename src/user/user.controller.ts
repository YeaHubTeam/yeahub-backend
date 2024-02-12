import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const LogMetadata = (controllerName: string, serviceName: string) =>
  SetMetadata('logInfo', { controllerName, serviceName });

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @LogMetadata('UsersController', 'UserService')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
