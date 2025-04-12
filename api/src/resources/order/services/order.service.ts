import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    return this.orderRepository.save(prepareForCreate(order));
  }

  async readAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async readById(id): Promise<Order> {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id, order: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, prepareForUpdate(order));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
