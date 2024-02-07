import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UserEntity } from 'libs/entities/src';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
