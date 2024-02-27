import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorators/public.decorator';
import { hashPassword } from '@/common/utils/hash-password';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Public()
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
        refresh_token: null,
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
  async create(@Body() userDto: CreateUserDto) {
    const passwordHashed = await hashPassword(userDto.passwordHash);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userResult } = await this.userService.create({
      ...userDto,
      passwordHash: passwordHashed,
    });

    return userResult;
  }
}
