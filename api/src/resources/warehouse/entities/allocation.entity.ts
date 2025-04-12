import { InStoreBase } from 'src/resources/base/base.entity';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('allocation')
export class Allocation extends InStoreBase {
  @OneToMany((type) => OrderLine, (order_line) => order_line.allocation)
  order_lines: OrderLine[];

  @OneToMany((type) => Stock, (stock) => stock.allocation)
  stocks: Stock[];

  @Column()
  quantity_allocated: number;
}
