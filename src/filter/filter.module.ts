import { Module } from '@nestjs/common';
import { TypeORMErrorFilter } from './custom-error-filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggingService } from './logging.service';
import { ErrorHandlerService } from './error-handling.service';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMErrorFilter,
    },
    {
      provide: ErrorHandlerService,
      useClass: ErrorHandlerService,
    },
    {
      provide: LoggingService,
      useClass: LoggingService,
    },
  ],
  controllers: [],
  exports: [],
})
export class FilterModule {}
