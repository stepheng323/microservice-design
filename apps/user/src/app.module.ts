import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repo/repository.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [config]}),
    DatabaseModule.forRoot(process.env.DATABASE_URL),
    RepositoryModule,
    AuthModule,
  ],
})
export class AppModule { }
