import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderLine } from '../entities/order-line.entity';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLine)
    private orderLineRepository: Repository<OrderLine>,
  ) {}

  async create(orderLine: CreateOrderDto): Promise<OrderLine> {
    return this.orderLineRepository.save(prepareForCreate(orderLine));
  }

  async readAll(): Promise<OrderLine[]> {
    return await this.orderLineRepository.find();
  }

  async readById(id): Promise<OrderLine> {
    return await this.orderLineRepository.findOneBy({ id });
  }

  async update(id, orderLine: UpdateOrderDto): Promise<OrderLine> {
    await this.orderLineRepository.update(id, prepareForUpdate(orderLine));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.orderLineRepository.delete(id);
  }
}
