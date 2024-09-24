import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RabbitMQService } from '@nestjs-scaffold/events';


@Module({
  imports: [],
  controllers: [ProductController],
  exports: [],
  providers: [
    ProductService,
    RabbitMQService,
  ],
})


export class ProductModule { }
