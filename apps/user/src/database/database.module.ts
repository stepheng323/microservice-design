import { Module, DynamicModule, Global } from '@nestjs/common';
import { KyselyService } from '@lib/database'

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(databaseUrl: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: KyselyService,
          useFactory: () => new KyselyService('postgres', { databaseUrl }),
        },
      ],
      exports: [KyselyService],
    };
  }
}
