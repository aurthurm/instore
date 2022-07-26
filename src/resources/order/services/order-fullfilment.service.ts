import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderFullfilment } from '../entities/order-fullfilment.entity';

@Injectable()
export class OrderFullfilmentService {
  constructor(
    @InjectRepository(OrderFullfilment)
    private orderRepository: Repository<OrderFullfilment>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderFullfilment> {
    return this.orderRepository.save(prepareForCreate(order));
  }

  async readAll(): Promise<OrderFullfilment[]> {
    return await this.orderRepository.find();
  }

  async readById(id): Promise<OrderFullfilment> {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id, order: UpdateOrderDto): Promise<OrderFullfilment> {
    await this.orderRepository.update(id, prepareForUpdate(order));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
