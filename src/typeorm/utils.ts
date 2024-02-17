import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as process from 'process';

const env = process.env.NODE_ENV || 'development';
const isDocker = process.env.DEPLOY_TYPE === 'docker';

export const useConfigService = () => {
  config();
  const configService = new ConfigService();

  const getPGUrlLocal = () => {
    return `postgresql://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@localhost:5432/${configService.get('POSTGRES_DB')}`;
  };

  const getPGUrl = () => {
    return env === 'development' && !isDocker
      ? getPGUrlLocal()
      : configService.get('DATABASE_URL');
  };

  return {
    getPGUrl,
  };
};
