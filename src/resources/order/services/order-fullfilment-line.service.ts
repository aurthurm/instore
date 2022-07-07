import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import {
  OrderFullfilmentLine,
  OrderFullfilmentLineDocument,
} from '../entities/order-fullfillment-line.entity';

@Injectable()
export class OrderFullfilmentLineService {
  constructor(
    @InjectModel(OrderFullfilmentLine.name)
    private orderModel: Model<OrderFullfilmentLineDocument>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderFullfilmentLine> {
    const newOrderFullfilmentLine = new this.orderModel(order);
    return newOrderFullfilmentLine.save();
  }

  async readAll(): Promise<OrderFullfilmentLine[]> {
    return await this.orderModel.find().exec();
  }

  async readById(id): Promise<OrderFullfilmentLine> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id, order: UpdateOrderDto): Promise<OrderFullfilmentLine> {
    return await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
