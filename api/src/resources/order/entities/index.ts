import { Order } from './order.entity';
import { OrderLine } from './order-line.entity';
import { OrderFullfilmentLine } from './order-fullfilment-line.entity';
import { OrderFullfilment } from './order-fullfilment.entity';

const ORDER_ENTITIES = [
  Order,
  OrderLine,
  OrderFullfilment,
  OrderFullfilmentLine,
];

export {
  Order,
  OrderLine,
  OrderFullfilment,
  OrderFullfilmentLine,
  ORDER_ENTITIES,
};
