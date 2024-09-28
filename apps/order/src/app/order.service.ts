import { Injectable } from '@nestjs/common';
import { OrderRepo } from '../repo';
import { CreateOrderDto } from '@lib/schema';
import { IServiceHelper, UserPayload } from '@lib/types';

@Injectable()
export class OrderService {
  constructor(private orderRep: OrderRepo) {
  }
  async createOrder(createOrderDto: CreateOrderDto, user: UserPayload): Promise<IServiceHelper> {
    const order = await this.orderRep.createOrder({
      ...createOrderDto,
      userId: user.id
    })
    return  {
      status: 'created',
      message: 'Order created successfully',
      data: order
    }
  }

  async getOrderById(id: string, user: UserPayload): Promise<IServiceHelper> {
    const order = await this.orderRep.getOrderById(id, user.id)
    return  {
      status: 'successful',
      message: 'Order fetched successfully',
      data: order
    }
  }
}
