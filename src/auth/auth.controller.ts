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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { authTokensMock, userLoginMock } from '@/auth/constants';
import { userMock } from '@/user/constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    schema: { example: authTokensMock },
  })
  @ApiBody({ schema: { example: userLoginMock } })
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

  @ApiOperation({ summary: 'Getting user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: { example: userMock },
  })
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req: { user: UserEntityPublic }) {
    return req.user;
  }

  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: { example: authTokensMock },
  })
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

  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @Get('logout')
  async logout(@Request() req: { user: TokenPayloadExtendedDto }) {
    await this.authService.logout(req.user.sub);
  }
}
