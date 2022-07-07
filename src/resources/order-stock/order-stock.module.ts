import { Module } from '@nestjs/common';
import { OrderStockService } from './order-stock.service';
import { OrderStockController } from './order-stock.controller';

@Module({
  controllers: [OrderStockController],
  providers: [OrderStockService]
})
export class OrderStockModule {}
