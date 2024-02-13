import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [TypeormModule, UserModule, FilterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
