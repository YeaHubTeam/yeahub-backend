import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import { ENTITIES } from 'libs/entities/src';

const env = process.env.NODE_ENV || 'development';
config({ path: join(process.cwd(), `.env.${env}`) });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');

  if (!url) {
    throw new Error('Database URL is empty');
  }
  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: env === 'development',
    entities: ENTITIES,
    migrationsRun: true,
    migrationsTableName: 'migrations',
    synchronize: env === 'development',
  };
};
export const appDataSource = new DataSource(options());
