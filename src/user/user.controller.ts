import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfileEntity } from '../profile/entities/profile.entity';
import {
  CreateUserApiDocs,
  GetUserProfileApiDocs,
  GetUsersApiDocs,
  RemoveUserApiDocs,
} from './decorators/user-api-docs.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetUsersApiDocs()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':userId/profile')
  @GetUserProfileApiDocs()
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<ProfileEntity> {
    return this.userService.findProfileByUserId(userId);
  }

  @Post()
  @CreateUserApiDocs()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Delete(':userId')
  @RemoveUserApiDocs()
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
