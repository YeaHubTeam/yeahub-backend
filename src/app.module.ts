import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [TypeormModule, UserModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
