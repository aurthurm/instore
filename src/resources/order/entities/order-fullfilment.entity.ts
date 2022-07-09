import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderFullfilmentLine } from './order-fullfilment-line.entity';
import { Order } from './order.entity';

@Entity('order_fullfilment')
export class OrderFullfilment extends InStoreBase {
  @ManyToOne((type) => Order, (order) => order.fullfilments)
  order: Order;

  @Column({ length: 20 })
  status: string;

  @Column({ length: 100 })
  tracking_number: string;

  @OneToMany(
    (type) => OrderFullfilmentLine,
    (fullfilmet) => fullfilmet.fullfilment,
  )
  fullfilment_lines: OrderFullfilmentLine[];
}
