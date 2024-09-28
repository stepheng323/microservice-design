import { RabbitmqBasePublisherService } from '@nestjs-scaffold/events';
import { ProductCreatedData } from '@lib/types';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublishProductCreated extends RabbitmqBasePublisherService {
  constructor(private configService: ConfigService) {
    super();
  }
  protected exchange =  this.configService.get<string>('EXCHANGE_NAME');

  emit(data: ProductCreatedData) {
    this.publishEvent('product.created', data)
  }

}
