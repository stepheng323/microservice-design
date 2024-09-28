import { BaseRabbitMQListener } from '@nestjs-scaffold/events';
import { UserRepo } from '../../repo/user.repo';
import { UserCreatedData } from '@lib/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserCreatedListener extends BaseRabbitMQListener{
  constructor(
    private configService: ConfigService,
    private userRepo: UserRepo,
  ) {
    super();
  }

  exchangeName = this.configService.get<string>('EXCHANGE_NAME');
  queueName =  this.configService.get<string>('QUEUE_NAME');
  routingKey = 'user.created';

  async handleMessage(content: UserCreatedData) {
    await this.userRepo.saveUser(content)
  }
}
