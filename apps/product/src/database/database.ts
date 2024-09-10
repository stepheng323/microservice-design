import { Module, DynamicModule, Global } from '@nestjs/common';
import { KyselyService } from '@lib/database'

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(databaseConfig: { host: string; user: string, database: string; password: string }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: KyselyService,
          useFactory: () => new KyselyService('mysql', databaseConfig),
        },
      ],
      exports: [KyselyService],
    };
  }
}
