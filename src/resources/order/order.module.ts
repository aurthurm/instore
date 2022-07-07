import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderLineController } from './controllers/order-line.controller';
import { OrderFullfilmentLineController } from './controllers/order-fullfiment-line.controller';
import { OrderFullfilmentController } from './controllers/order-fullfiment.controller';
import { OrderFullfilmentLineService } from './services/order-fullfilment-line.service';
import { OrderFullfilmentService } from './services/order-fullfilment.service';
import { OrderLineService } from './services/order-line.service';

@Module({
  controllers: [
    OrderController,
    OrderLineController,
    OrderFullfilmentLineController,
    OrderFullfilmentController,
  ],
  providers: [
    OrderService,
    OrderLineService,
    OrderFullfilmentLineService,
    OrderFullfilmentService,
  ],
})
export class OrderModule {}
