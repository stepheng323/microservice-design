import { BaseRabbitMQListener } from './rabbitMQ.service';
import { UserRepo } from '../repo/user.repo';
import { UserCreatedData } from '@lib/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCreatedListener extends BaseRabbitMQListener{
  routingKey = 'user.created';
  constructor(private userRepo: UserRepo) {
    super();
  }
  async handleMessage(content: UserCreatedData) {
    await this.userRepo.saveUser(content)
  }

}
