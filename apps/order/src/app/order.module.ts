import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import {
  UserCreatedListener,
  ProductCreatedListener,
  PublisherOrderCreated 
} from '../event';
import { OrderRepo, ProductRepo, UserRepo } from '../repo';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    OrderModule,
    DatabaseModule.forRoot(process.env.DATABASE_URL),

  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UserCreatedListener,
    ProductCreatedListener,
    PublisherOrderCreated,
    OrderRepo,
    UserRepo,
    ProductRepo
  ],
})
export class OrderModule {}
