import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all profiles with user data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profiles successfully found',
    schema: {
      example: [
        {
          id: 'adc3e5ae-a73f-427c-976d-a37dba30ccfd',
          userId: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
          user: {
            id: '700a28f9-9b2e-4e99-a2c9-fbe46d7854f1',
            firstName: 'test',
            lastName: 'test',
            avatarUrl: 'http://example.com/avatar.jpg',
            createdAt: '2024-02-18T09:28:38.752Z',
            updatedAt: '2024-02-18T09:28:38.752Z',
          },
        },
      ],
    },
  })
  findAll() {
    return this.profileService.findAll();
  }
}
