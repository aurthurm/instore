import { OrderService } from './order.service';
import { OrderLineService } from './order-line.service';
import { OrderFullfilmentLineService } from './order-fullfilment-line.service';
import { OrderFullfilmentService } from './order-fullfilment.service';

const ORDER_SERVICES = [
  OrderService,
  OrderLineService,
  OrderFullfilmentService,
  OrderFullfilmentLineService,
];

export {
  OrderService,
  OrderLineService,
  OrderFullfilmentService,
  OrderFullfilmentLineService,
  ORDER_SERVICES,
};
