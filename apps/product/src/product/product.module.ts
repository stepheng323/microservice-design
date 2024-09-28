import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PublishProductCreated } from '../events';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PublishProductCreated],
})

export class ProductModule { }
