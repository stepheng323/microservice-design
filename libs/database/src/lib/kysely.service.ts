import { Injectable } from '@nestjs/common';
import { Kysely, PostgresDialect, MysqlDialect } from 'kysely';
import { Pool } from 'pg';
import { createPool } from 'mysql2'

@Injectable()
export class KyselyService<T> extends Kysely<T> {
  constructor(databaseUrl: string, dialectType: 'postgres' | 'mysql') {
    let dialect;
    if (dialectType === 'postgres') {
      dialect = new PostgresDialect({
        pool: new Pool({ connectionString: databaseUrl }),
      });
    } else if (dialectType === 'mysql') {
      dialect = new MysqlDialect({
        pool: createPool(databaseUrl),
      });
    } else {
      throw new Error('Unsupported database dialect');
    }

    super({ dialect });
  }
}
