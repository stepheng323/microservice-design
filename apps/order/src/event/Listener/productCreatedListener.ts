import { BaseRabbitMQListener } from '@nestjs-scaffold/events';
import { ProductCreatedData } from '@lib/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductRepo } from '../../repo';

@Injectable()
export class ProductCreatedListener extends BaseRabbitMQListener{

  constructor(
    private configService: ConfigService,
    private productRepo: ProductRepo
  ) {
    super();
  }
  protected exchangeName = this.configService.get<string>('EXCHANGE_NAME');
  protected queueName = this.configService.get<string>('QUEUE_NAME');
  protected routingKey = 'product.created'


  protected async handleMessage(data: ProductCreatedData) {
    console.log("Order service received user created event",data);
    await this.productRepo.createOrder(data)
  }

}
