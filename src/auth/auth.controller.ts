import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { UserEntity } from '@/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntityPublic } from '@/user/types';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserEntity }) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req: { user: UserEntityPublic }) {
    return req.user;
  }
}
