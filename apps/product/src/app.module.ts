import { Module } from '@nestjs/common';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database';
import { config } from './config'
import { ProductModule } from './product/product.module';
import { RepositoryModule } from './repo/repo.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [config]}),
    DatabaseModule.forRoot(process.env.DATABASE_URL),
    ProductModule,
    RepositoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule { }
