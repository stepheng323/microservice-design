import {Response} from 'express'
import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';

import { OrderService } from './order.service';
import { AuthGuard, ZodValidationPipe } from '@lib/utils';
import {
  CreateOrderSchema,
  CreateOrderDto,
} from '@lib/schema';
import { convertResponse, CurrentUser } from '@lib/helper';
import { UserPayload } from '@lib/types';

@UseGuards(AuthGuard)
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(
    @Res() res: Response,
    @Body(new ZodValidationPipe(CreateOrderSchema)) createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserPayload) {
    const data = await this.orderService.createOrder(createOrderDto, user);
    return convertResponse(res, data)
  }

  @Get(':id')
  async getOrderById(
    @Res() res: Response,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload) {
    const data = await this.orderService.getOrderById(id, user);
    return convertResponse(res, data)
  }

}
