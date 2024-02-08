import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeormModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
