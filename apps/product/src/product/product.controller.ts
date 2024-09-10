import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { ProductService } from './product.service';
import { sendResponse } from '@lib/helper';
import { ZodValidationPipe } from '@lib/utils';
import { CreateProductDto, createProductSchema } from '@lib/schema';

@Controller('product')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const data = await this.appService.create(createProductDto);
    return sendResponse(data)
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const data = await this.appService.fetchProduct(id);
    return sendResponse(data)
  }
  @Get()
  async getProducts() {
    const data  =  await this.appService.fetchProducts();
    return sendResponse(data)
  }
}
