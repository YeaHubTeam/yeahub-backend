import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { FilterModule } from './filter/filter.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeormModule, UserModule, FilterModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
