import { Injectable } from '@nestjs/common';
import { CreateOrderStockDto } from './dto/create-order-stock.dto';
import { UpdateOrderStockDto } from './dto/update-order-stock.dto';

@Injectable()
export class OrderStockService {
  create(createOrderStockDto: CreateOrderStockDto) {
    return 'This action adds a new orderStock';
  }

  findAll() {
    return `This action returns all orderStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStock`;
  }

  update(id: number, updateOrderStockDto: UpdateOrderStockDto) {
    return `This action updates a #${id} orderStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStock`;
  }
}
