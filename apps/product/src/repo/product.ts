import { KyselyService } from '@lib/database';
import { Injectable } from '@nestjs/common';
import { DB } from '../types/database';
import { CreateProductDto, UpdateProductDto } from '@lib/schema';
import { randomUUID } from 'crypto';


@Injectable()
export class ProductRepo {
  constructor(private readonly client: KyselyService<DB>) { }

  async getProductById(id: string) {
    return this.client
      .selectFrom('Product').select(['id', 'name', 'userId', 'description', 'quantity', 'price', 'isInStock'])
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async createProduct(productDetails: CreateProductDto, userId: string) {
    const id = randomUUID();
    await this.client
      .insertInto('Product')
      .values({ ...productDetails, id, userId, price: productDetails.price.toString() })
      .executeTakeFirst()

    return this.client
      .selectFrom('Product')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }

  async fetchAll() {
    return this.client.selectFrom('Product')
      .select(['id', 'userId', 'name', 'productImage', 'quantity', 'price'])
      .execute()
  }

  async updateProduct({ id, body, userId }: { id: string; body: UpdateProductDto; userId: string }) {
    return this.client.updateTable('Product')
      .set(body)
      .where('id', '=', id)
      .where('userId', '=', userId)
      .executeTakeFirst()
  }
}
