import { Injectable } from '@nestjs/common';
import { Kysely, PostgresDialect, MysqlDialect } from 'kysely';
import { Pool } from 'pg';
import { createPool } from 'mysql2'

@Injectable()
export class KyselyService<T> extends Kysely<T> {
  constructor(
    dialectType: 'postgres' | 'mysql',
    config: { databaseUrl: string } | { host: string; user: string; password: string; database: string }
  ) {
    let dialect;
    if (dialectType === 'postgres') {
      if ('databaseUrl' in config) {
        dialect = new PostgresDialect({
          pool: new Pool({ connectionString: config.databaseUrl }),
        });
      } else {
        throw new Error('PostgreSQL requires a databaseUrl');
      }
    } else if (dialectType === 'mysql') {
      if ('host' in config && 'user' in config && 'password' in config && 'database' in config) {
        dialect = new MysqlDialect({
          pool: async () => createPool(config),
        });
      } else {
        throw new Error('MySQL requires host, user, password, and database');
      }
    } else {
      throw new Error('Unsupported database dialect');
    }

    super({ dialect });
  }
}
