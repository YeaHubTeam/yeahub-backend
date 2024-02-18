import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileEntity } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROFILES_QUERY } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, ...PROFILES_QUERY],
  exports: [TypeOrmModule, ProfileService],
})
export class ProfileModule {}
