import { OrderController } from './order.controller';
import { OrderLineController } from './order-line.controller';
import { OrderFullfilmentController } from './order-fullfilment.controller';
import { OrderFullfilmentLineController } from './order-fullfiment-line.controller';

const ORDER_CONTROLLERS = [
  OrderController,
  OrderLineController,
  OrderFullfilmentController,
  OrderFullfilmentLineController,
];

export {
  OrderController,
  OrderLineController,
  OrderFullfilmentController,
  OrderFullfilmentLineController,
  ORDER_CONTROLLERS,
};
