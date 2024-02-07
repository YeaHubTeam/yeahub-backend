import { Module } from '@nestjs/common';
import { ProvidersModule } from 'lib/providers';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProvidersModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
