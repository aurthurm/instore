import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderFullfilmentLine } from '../entities';

@Injectable()
export class OrderFullfilmentLineService {
  constructor(
    @InjectRepository(OrderFullfilmentLine)
    private orderRepository: Repository<OrderFullfilmentLine>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderFullfilmentLine> {
    return this.orderRepository.save(prepareForCreate(order));
  }

  async readAll(): Promise<OrderFullfilmentLine[]> {
    return await this.orderRepository.find();
  }

  async readById(id): Promise<OrderFullfilmentLine> {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id, order: UpdateOrderDto): Promise<OrderFullfilmentLine> {
    await this.orderRepository.update(id, prepareForUpdate(order));
    return this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.orderRepository.remove(id);
  }
}
