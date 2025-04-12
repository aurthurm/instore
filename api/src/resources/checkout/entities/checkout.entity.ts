import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { User } from 'src/resources/user/entities/user.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('check_out')
export class CheckOut extends InStoreBase {
  @Column()
  last_change: Date;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  note: string;

  @Column()
  currency: string;

  @Column()
  tracking_code: string;

  @ManyToOne((type) => User, (user) => user.checkouts)
  user: User;

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.checkouts)
  collection_point: WareHouse;

  @OneToMany((type) => CheckOutLine, (checkout_line) => checkout_line.variant)
  checkout_lines: CheckOutLine;
}
