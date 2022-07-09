import { InStoreBase } from 'src/resources/base/base.entity';
import { User } from 'src/resources/user/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderFullfilment } from './order-fullfilment.entity';
import { OrderLine } from './order-line.entity';

@Entity('order')
export class Order extends InStoreBase {
  @Column({ length: 50, unique: true })
  number: string;

  @Column({ length: 20 })
  status: string;

  @Column({ length: 20, nullable: true })
  authorise_status: string;

  @Column({ length: 20, nullable: true })
  charge_status: string;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  @Column({ length: 100 })
  tracking_id: string;

  @Column({ length: 50, nullable: true })
  user_email: string;

  @Column({ length: 100, nullable: true })
  origin: string;

  @Column({ length: 10, nullable: true })
  currency: string;

  @Column({ length: 255, nullable: true })
  shipping_method: string;

  @Column({ length: 100, nullable: true })
  shipping_method_name: string;

  @Column({ length: 255, nullable: true })
  collection_point: string; // WareHouse

  @Column({ length: 100, nullable: true })
  collection_point_name: string;

  @Column({ nullable: true })
  total_amount: number;

  @Column({ type: 'text', nullable: true })
  customer_note: string;

  @Column({ length: 20, nullable: true })
  weight: string;

  @OneToMany((type) => OrderLine, (order_line) => order_line.order)
  order_lines: OrderLine[];

  @OneToMany((type) => OrderFullfilment, (fulfillment) => fulfillment.order)
  fullfilments: OrderFullfilment;
}
