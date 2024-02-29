import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';
import { GetProfilesApiDocs } from './decorators/get-profiles.decorator';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @GetProfilesApiDocs()
  findAll() {
    return this.profileService.findAll();
  }
}
