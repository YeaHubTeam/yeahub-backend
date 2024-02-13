import { Injectable, Logger } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private logger = new Logger();

  logError(
    errorMessage: string,
    controllerName: string,
    serviceName: string,
    status: HttpStatus,
  ) {
    this.logger.warn(`Error in ${controllerName} of ${serviceName}`);
    this.logger.error(`${errorMessage}  }`);
    this.logger.log(`HTTP Status: ${status.toString()}`);
  }
}
