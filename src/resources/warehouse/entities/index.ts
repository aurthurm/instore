import { PreOrderReservation } from './preorder-reservation.entity';
import { Allocation } from './allocation.entity';
import { PreOrderAllocation } from './preorder-allocation.entity';
import { Reservation } from './reservation.entity';
import { Stock } from './stock.entity';
import { WareHouse } from './warehouse.entity';

const WAREHOUSE_ENTITIES = [
  Stock,
  WareHouse,
  Reservation,
  PreOrderReservation,
  Allocation,
  PreOrderAllocation,
];

export {
  Stock,
  WareHouse,
  Reservation,
  PreOrderReservation,
  Allocation,
  PreOrderAllocation,
  WAREHOUSE_ENTITIES,
};
