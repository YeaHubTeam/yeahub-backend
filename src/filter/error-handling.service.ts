import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class ErrorHandlerService {
  public handleQueryFailedError(
    exception: QueryFailedError,
    methodName: string,
  ): {
    statusCode: HttpStatus;
    message: string;
  } {
    let statusCode: HttpStatus;
    const errorMessage: string = `Method ${methodName} - TypeORM QueryFailedError: ${exception.message}`;

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

    return { statusCode, message: errorMessage };
  }
}
