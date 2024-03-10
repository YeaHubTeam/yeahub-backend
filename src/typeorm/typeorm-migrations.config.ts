import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as process from 'process';
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
    entities: [join(process.cwd(), 'src', '**', '*.entity.ts')],
    migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};
export const appDataSource = new DataSource(options());
