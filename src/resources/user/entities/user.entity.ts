import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOut } from 'src/resources/checkout/entities/checkout.entity';
import { Order } from 'src/resources/order/entities/order.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User extends InStoreBase {
  @Column({ length: 50, unique: true })
  userName: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 200, nullable: true })
  pin: string;

  @Column({ length: 200, nullable: true })
  resetPinKey: string;

  @Column()
  requirePinChange: boolean;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 200, nullable: true })
  resetPasswordKey: string;

  @Column()
  requirePasswordChange: boolean;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50, nullable: true })
  middleName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  lastPasswordReset: Date;

  @Column({ type: 'json' })
  roles: string[];

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @OneToMany((type) => CheckOut, (checkout) => checkout.user)
  checkouts: CheckOut[];
}
