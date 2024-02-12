import { Catch, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMErrorFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(TypeORMErrorFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorMessage = `TypeORM QueryFailedError: ${exception.message}`;
    let statusCode: HttpStatus;

    const metadata = Reflect.getMetadata(
      'logInfo',
      request.route.stack[0].handle,
    );

    const controllerName = metadata
      ? metadata.controllerName
      : 'Unknown Controller';
    const serviceName = metadata ? metadata.serviceName : 'Unknown Service';

    const errorLocation = `Controller: ${controllerName}, Service: ${serviceName}`;

    this.logger.error(`${errorMessage} at ${errorLocation}`);

    if (exception.message.includes('violates not-null constraint')) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (
      exception.message.includes(
        'duplicate key value violates unique constraint',
      )
    ) {
      statusCode = HttpStatus.CONFLICT;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(statusCode).json({
      statusCode,
      message: errorMessage,
    });
  }
}
