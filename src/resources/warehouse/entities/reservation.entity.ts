import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('reservation')
export class Reservation extends InStoreBase {
  @OneToMany(
    (type) => CheckOutLine,
    (checkout_line) => checkout_line.reservation,
  )
  checkout_lines: CheckOutLine[];

  @OneToMany((type) => Stock, (stock) => stock.reservation)
  stocks: Stock[];

  @Column()
  quantity_reserved: number;

  @Column()
  reserved_until: Date;
}
