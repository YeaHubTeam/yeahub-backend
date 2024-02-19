import { configService } from '../../common/utils';

export const jwtConstants = {
  secret: configService.get<string>('SERVICE_JWT_SECRET'),
} as const;

export const SALT_ROUNDS = 10 as const;
