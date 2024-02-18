import { configService } from '@/common/utils';

export const jwtConstants = {
  secret: configService.get<string>('SERVICE_JWT_SECRET'),
} as const;
