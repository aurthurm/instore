import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import {
  OrderFullfilment,
  OrderFullfilmentDocument,
} from '../entities/order-fulfillment.entity';

@Injectable()
export class OrderFullfilmentService {
  constructor(
    @InjectModel(OrderFullfilment.name)
    private orderModel: Model<OrderFullfilmentDocument>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderFullfilment> {
    const newOrderFullfilment = new this.orderModel(order);
    return newOrderFullfilment.save();
  }

  async readAll(): Promise<OrderFullfilment[]> {
    return await this.orderModel.find().exec();
  }

  async readById(id): Promise<OrderFullfilment> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id, order: UpdateOrderDto): Promise<OrderFullfilment> {
    return await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
