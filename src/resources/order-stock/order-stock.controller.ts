import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStockService } from './order-stock.service';
import { CreateOrderStockDto } from './dto/create-order-stock.dto';
import { UpdateOrderStockDto } from './dto/update-order-stock.dto';

@Controller('order-stock')
export class OrderStockController {
  constructor(private readonly orderStockService: OrderStockService) {}

  @Post()
  create(@Body() createOrderStockDto: CreateOrderStockDto) {
    return this.orderStockService.create(createOrderStockDto);
  }

  @Get()
  findAll() {
    return this.orderStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStockDto: UpdateOrderStockDto) {
    return this.orderStockService.update(+id, updateOrderStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStockService.remove(+id);
  }
}
