import { Injectable } from '@nestjs/common';
import { IServiceHelper } from '@lib/types';
import { ProductRepo } from '../repo/product';
import { CreateProductDto, UpdateProductDto } from '@lib/schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepo) {
  }
  async create(productDto: CreateProductDto): Promise<IServiceHelper> {
    await this.productRepository.createProduct(productDto)
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
    console.log({products});
    return {
      status: 'successful',
      message: 'Products fetched successfully',
      data: products
    }
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<IServiceHelper> {
    const updatedProduct = await this.productRepository.updateProduct(id, body)
    return {
      status: 'successful',
      message: 'Product updated successfully',
      data: updatedProduct
    }
  }
}
