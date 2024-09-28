import { Injectable } from '@nestjs/common';
import { KyselyService } from '@lib/database';
import { DB } from '../types/database';
import { CreateOrderDto } from '@lib/schema';

@Injectable()
export class OrderRepo {
  constructor(private client: KyselyService<DB>) {}

  async createOrder(data: CreateOrderDto & {userId: string}) {
    return this.client
      .insertInto('Order')
      .values({ ...data, amount: data.amount.toString() })
      .returning(['id', 'userId', 'quantity', 'quantity', 'amount'])
      .executeTakeFirst()
  }

  async getOrderById(id: string, userId: string) {
    return this.client
      .selectFrom('Order')
      .select(['id', 'userId', 'quantity', 'status', 'amount'])
      .where('id', '=', id)
      .where('userId', '=', userId)
      .executeTakeFirst()
  }
}
