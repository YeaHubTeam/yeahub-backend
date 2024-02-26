import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { UserEntity } from '@/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntityPublic } from '@/user/types';
import { Public } from '@/auth/decorators/public.decorator';
import {
  AuthTokenDto,
  TokenPayloadDto,
  TokenPayloadExtendedDto,
} from '@/auth/types';
import { JwtRefreshGuard } from '@/auth/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserEntity }): Promise<AuthTokenDto> {
    const tokenPayload: TokenPayloadDto = {
      username: req.user.email,
      sub: req.user.id,
    };

    return this.authService.signTokens(tokenPayload);
  }

  @Get('profile')
  async getProfile(@Request() req: { user: UserEntityPublic }) {
    return req.user;
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(
    @Request() req: { user: TokenPayloadExtendedDto },
  ): Promise<AuthTokenDto> {
    const payload: TokenPayloadDto = {
      username: req.user.username,
      sub: req.user.sub,
    };

    return this.authService.signTokens(payload);
  }
}
