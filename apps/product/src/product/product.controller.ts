import { Body, Controller, Get, Param, Post, Put, Res, UseGuards, UsePipes } from '@nestjs/common';
import {Response} from 'express'
import { ProductService } from './product.service';
import { convertResponse } from '@lib/helper';
import { AuthGuard, ZodValidationPipe } from '@lib/utils';
import { CreateProductDto, createProductSchema, UpdateProductDto, updateProductSchema } from '@lib/schema';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto) {
    const data = await this.appService.create(createProductDto);
    return convertResponse(res, data)
  }

  @Get(':id')
  async getProductById(
    @Res() res: Response,
    @Param('id') id: string) {
    const data = await this.appService.fetchProduct(id);
    return convertResponse(res, data)
  }

  @Get()
  async getProducts(
    @Res() res: Response,
  ) {
    const data = await this.appService.fetchProducts();
    return convertResponse(res, data)
  }

  @Put(':id')
  async updateProduct(
    @Res() res: Response,
    @Body(new ZodValidationPipe(updateProductSchema)) body: UpdateProductDto,
    @Param('id') id: string) {
    const data=  await this.appService.updateProduct(id, body);
    return convertResponse(res, data)
  }
}
