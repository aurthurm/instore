import { InStoreBase } from 'src/resources/base/base.entity';
import { ProductVariant } from 'src/resources/product/entities';
import { PreOrderReservation } from 'src/resources/warehouse/entities/preorder-reservation.entity';
import { Reservation } from 'src/resources/warehouse/entities/reservation.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { CheckOut } from './checkout.entity';

@Entity('check_out_line')
export class CheckOutLine extends InStoreBase {
  @Column()
  quantity: number;

  @Column()
  price_override: boolean;

  @ManyToOne((type) => CheckOut, (checkout) => checkout.checkout_lines)
  checkout: CheckOut;

  @ManyToOne(
    (type) => ProductVariant,
    (product_variant) => product_variant.checkout_lines,
  )
  variant: ProductVariant;

  @ManyToOne((type) => Reservation, (reservaton) => reservaton.stocks)
  reservation: Reservation;

  @ManyToOne(
    (type) => PreOrderReservation,
    (reservaton) => reservaton.checkout_lines,
  )
  preorder_reservation: PreOrderReservation;
}
