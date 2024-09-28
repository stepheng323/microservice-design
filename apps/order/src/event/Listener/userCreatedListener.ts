import { BaseRabbitMQListener } from '@nestjs-scaffold/events';
import { UserCreatedData } from '@lib/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepo } from '../../repo';

@Injectable()
export class UserCreatedListener extends BaseRabbitMQListener{

  constructor(
    private configService: ConfigService,
    private userRepo: UserRepo
  ) {
    super();
  }
  protected exchangeName = this.configService.get<string>('EXCHANGE_NAME');
  protected queueName = this.configService.get<string>('QUEUE_NAME');
  protected routingKey = 'user.created'


  protected async handleMessage(data: UserCreatedData) {
    console.log("Order service received user created event",data);
    await this.userRepo.saveUser(data)
  }

}
