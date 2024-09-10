import { KyselyService } from "@lib/database";
import { Injectable } from "@nestjs/common";
import { DB } from "../types/database";
import { CreateProductDto, UpdateProductDto } from '@lib/schema';
import {randomUUID} from 'crypto'


@Injectable()
export class ProductRepo {
  constructor(private readonly client: KyselyService<DB>) { }

  async getProductById(id: string) {
    return this.client
      .selectFrom('Product').select(['id', 'name', 'userId', 'description', 'quantity', 'price', 'isInStock'])
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async createProduct(productDetails: CreateProductDto) {
    return this.client
      .insertInto('Product')
      .values({ ...productDetails, id: randomUUID(), userId: '12345',  price: productDetails.price.toString() })
      // .returning([
      //   'id',
      //   'userId',
      //   'name',
      //   'description',
      //   'isInStock',
      //   'productImage',
      //   'price',
      // ])
      .executeTakeFirst()
  }

  async fetchAll() {
    return this.client.selectFrom('Product').select(['id', 'userId', 'name', 'productImage', 'quantity', 'price']).execute()
  }

  async updateProduct(id: string, body: UpdateProductDto) {
    return this.client.updateTable('Product').set(body).where('id', '=', id).returningAll().executeTakeFirst()
  }
}
