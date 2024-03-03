import {
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, PublicUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersApiDocs } from './decorators/get-users-api-docs.decorator';
import { CreateUserApiDocs } from './decorators/create-user-api-docs.decorator';
import { Public } from '@/auth/decorators/public.decorator';
import { UserEntity } from '@/user/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetUsersApiDocs()
  async getUsers(): Promise<PublicUserDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Public()
  @Post()
  @CreateUserApiDocs()
  async createUser(@Body() userDto: CreateUserDto): Promise<PublicUserDto> {
    return await this.userService.createUser(userDto);
  }
}
