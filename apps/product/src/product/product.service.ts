import { Injectable } from '@nestjs/common';
import { IServiceHelper } from '@lib/types';
import { ProductRepo } from '../repo/product';
import { CreateProductDto } from '@lib/schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepo) {
  }
  async create(productDto: CreateProductDto): Promise<IServiceHelper> {
    const product = await this.productRepository.createProduct(productDto)
    return {
      status: 'created',
      message: 'Welcome to product service',
      data: product
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
    console.log({products});
    return {
      status: 'successful',
      message: 'Products fetched successfully',
      data: products
    }
  }
}
