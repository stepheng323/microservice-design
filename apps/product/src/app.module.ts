import { Module } from '@nestjs/common';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database';
import { config } from './config'
import { ProductModule } from './product/product.module';
import { RepositoryModule } from './repo/repo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@lib/utils';
import { PublishProductCreated, UserCreatedListener } from './events';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['../.env'],

    }),
    DatabaseModule.forRoot({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER
    }),
    ProductModule,
    RepositoryModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    UserCreatedListener,
    PublishProductCreated,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
