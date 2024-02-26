import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import { ENTITIES } from 'src/index.entities';
import { getPGUrl } from '../common/utils';

const env = process.env.NODE_ENV || 'development';

const options = (): DataSourceOptions => {
  const url = getPGUrl();
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
