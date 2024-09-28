import { Injectable } from '@nestjs/common';
import { IServiceHelper } from '@lib/types';
import { ProductRepo } from '../repo/product';
import { CreateProductDto, UpdateProductDto } from '@lib/schema';
import { UserPayload } from '@lib/types';
import { PublishProductCreated } from '../events';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepo,
    private readonly productCreated: PublishProductCreated,
  ) {
  }
  async create(productDto: CreateProductDto, user: UserPayload): Promise<IServiceHelper> {
    const product = await this.productRepository.createProduct(productDto, user.id)
     this.productCreated.emit(product);
    return {
      status: 'created',
      message: 'Product created successfully',
    };
  }

  async fetchProduct(id: string): Promise<IServiceHelper> {
    const product = await this.productRepository.getProductById(id);
    if(!product) return  {
      status: 'not-found',
      message: 'Product not found'
    }
    return  {
      status: 'successful',
      message: 'Product fetched successfully',
      data: product
    }
  }

  async fetchProducts(): Promise<IServiceHelper> {
    const products = await this.productRepository.fetchAll()
    return {
      status: 'successful',
      message: 'Products fetched successfully',
      data: products
    }
  }

  async updateProduct({id, body, user}: {
    id: string; user: UserPayload;  body:UpdateProductDto }): Promise<IServiceHelper> {
    const updatedProduct = await this.productRepository.updateProduct({
      id,
      body,
      userId: user.id
    })
    return {
      status: 'successful',
      message: 'Product updated successfully',
      data: updatedProduct
    }
  }
}
