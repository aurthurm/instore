import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderLine, OrderLineDocument } from '../entities/order-line.entity';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectModel(OrderLine.name) private orderModel: Model<OrderLineDocument>,
  ) {}

  async create(orderLine: CreateOrderDto): Promise<OrderLine> {
    const newOrderLine = new this.orderModel(orderLine);
    return newOrderLine.save();
  }

  async readAll(): Promise<OrderLine[]> {
    return await this.orderModel.find().exec();
  }

  async readById(id): Promise<OrderLine> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id, orderLine: UpdateOrderDto): Promise<OrderLine> {
    return await this.orderModel.findByIdAndUpdate(id, orderLine, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.orderModel.findByIdAndRemove(id);
  }
}
