import { InStoreBase } from 'src/resources/base/base.entity';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('pre_order_allocation')
export class PreOrderAllocation extends InStoreBase {
  @OneToMany(
    (type) => OrderLine,
    (order_line) => order_line.preorder_allocation,
  )
  order_lines: OrderLine[];

  @Column()
  quantity: number;
}
