import { PreOrderReservationService } from './preorder-reservation.service';
import { AllocationService } from './allocation.service';
import { PreOrderAllocationService } from './preorder-allocation.service';
import { ReservationService } from './reservation.service';
import { StockService } from './stock.service';
import { WareHouseService } from './warehouse.service';

const WAREHOUSE_SERVICES = [
  StockService,
  WareHouseService,
  ReservationService,
  PreOrderReservationService,
  AllocationService,
  PreOrderAllocationService,
];

export {
  StockService,
  WareHouseService,
  ReservationService,
  PreOrderReservationService,
  AllocationService,
  PreOrderAllocationService,
  WAREHOUSE_SERVICES,
};
