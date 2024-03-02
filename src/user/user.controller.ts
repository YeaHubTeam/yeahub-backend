import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, PublicUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserApiDocs,
  GetUsersApiDocs,
} from './decorators/user-api-docs.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetUsersApiDocs()
  async getUsers(): Promise<PublicUserDto[]> {
    return this.userService.getUsers();
  }

  @Post()
  @CreateUserApiDocs()
  createUser(@Body() userDto: CreateUserDto): Promise<PublicUserDto> {
    return this.userService.createUser(userDto);
  }
}
