import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { ProductService } from './product.service';
import { convertResponse } from '@lib/helper';
import { AuthGuard, ZodValidationPipe } from '@lib/utils';
import {
  CreateProductDto,
  createProductSchema,
  UpdateProductDto,
  updateProductSchema
} from '@lib/schema';
import { CurrentUser } from '@lib/helper';
import { UserPayload } from '@lib/types';

@Controller('')
export class ProductController {
  constructor(private readonly appService: ProductService) { }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createProductSchema)) createProductDto: CreateProductDto,
    @CurrentUser() user: UserPayload
  ) {
    const data = await this.appService.create(createProductDto, user);
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
  @UseGuards(AuthGuard)
  async updateProduct(
    @Res() res: Response,
    @Body(new ZodValidationPipe(updateProductSchema)) body: UpdateProductDto,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload
  ) {
    const data = await this.appService.updateProduct({ id, body, user });
    return convertResponse(res, data)
  }
}
