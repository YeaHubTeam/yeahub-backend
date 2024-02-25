import { configService } from '@/common/utils';

export const JWT_KEYS = {
  ACCESS_SECRET: configService.get<string>('SERVICE_JWT_SECRET'),
  REFRESH_SECRET: configService.get<string>('SERVICE_JWT_REFRESH_SECRET'),
} as const;

export const SALT_ROUNDS = 10 as const;
