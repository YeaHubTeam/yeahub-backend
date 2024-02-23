import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileEntity } from '../profile/entities/profile.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':userId/profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find profile by userId'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile successfully found',
    schema: {
      example: {
        id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
        userId: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<ProfileEntity> {
    return this.userService.findProfileByUserId(userId);
  }

  @Post()
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
