import { RabbitmqBasePublisherService } from '@nestjs-scaffold/events';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PublisherOrderCreated extends RabbitmqBasePublisherService {
  constructor(private configService: ConfigService) {
    super();
  }
  protected exchange = this.configService.get<string>('EXCHANGE_NAME');

  protected emit(payload: {id: string}) {
    this.publishEvent('order.created', payload)
  }

}
