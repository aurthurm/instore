import { PreOrderReservationController } from './preorder-reservation.controller';
import { AllocationController } from './allocation.controller';
import { PreOrderAllocationController } from './preorder-allocation.controller';
import { ReservationController } from './reservation.controller';
import { StockController } from './stock.controller';
import { WareHouseController } from './warehouse.controller';

const WAREHOUSE_CONTROLLERS = [
  StockController,
  WareHouseController,
  ReservationController,
  PreOrderReservationController,
  AllocationController,
  PreOrderAllocationController,
];

export {
  StockController,
  WareHouseController,
  ReservationController,
  PreOrderReservationController,
  AllocationController,
  PreOrderAllocationController,
  WAREHOUSE_CONTROLLERS,
};
