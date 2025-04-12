import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('pre_order_reservaton')
export class PreOrderReservation extends InStoreBase {
  @OneToMany(
    (type) => CheckOutLine,
    (checkout_line) => checkout_line.preorder_reservation,
  )
  checkout_lines: CheckOutLine[];

  @Column()
  quantity_reserved: number;

  @Column()
  reserved_until: Date;
}
