import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, PublicUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersApiDocs } from './decorators/get-users-api-docs.decorator';
import { CreateUserApiDocs } from './decorators/create-user-api-docs.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetUsersApiDocs()
  async getUsers(): Promise<PublicUserDto[]> {
    return await this.userService.getUsers();
  }

  @Post()
  @CreateUserApiDocs()
  async createUser(@Body() userDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.userService.createUser(userDto);
  }
}
