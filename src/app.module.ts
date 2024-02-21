import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeormModule, UserModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
