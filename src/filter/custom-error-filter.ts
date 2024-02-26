import { Catch, ExceptionFilter, ArgumentsHost, Inject } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ErrorHandlerService } from './error-handling.service';
import { LoggingService } from './logging.service';

@Catch(QueryFailedError)
export class TypeORMErrorFilter implements ExceptionFilter {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    @Inject(LoggingService) private readonly loggingService: LoggingService,
  ) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const methodName = request.route.stack[0].handle.name;
    const { statusCode, message } =
      this.errorHandlerService.handleQueryFailedError(exception, methodName);

    const metadata = Reflect.getMetadata(
      'logInfo',
      request.route.stack[0].handle,
    );

    const serviceName = metadata ? metadata.serviceName : 'Unknown Service';
    const controllerName = metadata
      ? metadata.controllerName
      : 'Unknown Controller';

    this.loggingService.logError(
      message,
      controllerName,
      serviceName,
      statusCode,
    );

    response.status(statusCode).json({
      statusCode,
    });
  }
}
