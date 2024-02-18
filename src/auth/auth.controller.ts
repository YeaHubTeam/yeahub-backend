import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserEntity } from '@/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserEntity }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }
}
