import { Module } from '@nestjs/common';
import { CheckoutStockService } from './checkout-stock.service';
import { CheckoutStockController } from './checkout-stock.controller';

@Module({
  controllers: [CheckoutStockController],
  providers: [CheckoutStockService]
})
export class CheckoutStockModule {}
