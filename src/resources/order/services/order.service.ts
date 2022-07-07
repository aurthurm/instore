import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order, OrderDocument } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async readAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async readById(id): Promise<Order> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id, order: UpdateOrderDto): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
