import { Injectable } from '@nestjs/common';
import { KyselyService } from '@lib/database';
import { DB } from '../types/database';
import { ProductCreatedData } from '@lib/types';

@Injectable()
export class ProductRepo {
  constructor(private client: KyselyService<DB>) {}

  async createOrder(data: ProductCreatedData) {
    return this.client
      .insertInto('Product')
      .values(data)
      .executeTakeFirst()
  }
}
