import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { TypeORMErrorFilter } from './filters/custom-error-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [TypeormModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMErrorFilter,
    },
  ],
})
export class AppModule {}
