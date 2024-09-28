import { RabbitmqBasePublisherService } from '@nestjs-scaffold/events';
import { UserCreatedData } from '@lib/types';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherUserCreated extends RabbitmqBasePublisherService{
  constructor(private configServices: ConfigService) {
    super();
  }

  protected exchange = this.configServices.get<string>('EXCHANGE_NAME');


  emit(data: UserCreatedData) {
    this.publishEvent('user.created', data)
  }

}
