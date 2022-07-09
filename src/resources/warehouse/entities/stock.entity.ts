import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Allocation } from './allocation.entity';
import { Reservation } from './reservation.entity';
import { WareHouse } from './warehouse.entity';

@Entity('stock')
export class Stock extends InStoreBase {
  @Column()
  quantity: number;

  @Column()
  quantity_allocated: number;

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.stocks)
  warehouse: WareHouse;

  @ManyToOne((type) => Reservation, (reservaton) => reservaton.stocks)
  reservation: Reservation;

  @ManyToOne((type) => Allocation, (allocation) => allocation.stocks)
  allocation: Allocation;
}
