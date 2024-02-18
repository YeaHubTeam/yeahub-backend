import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileEntity } from './entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll(): Promise<ProfileEntity[]> {
    return this.profileService.findAll();
  }
}
