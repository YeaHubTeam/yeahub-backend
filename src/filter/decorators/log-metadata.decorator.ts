import { SetMetadata } from '@nestjs/common';

export const LogMetadata = (controllerName: string, serviceName: string) =>
  SetMetadata('logInfo', { controllerName, serviceName });
