import { ProductVariantStock } from './../../product/entities/product-variant-stock.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOut } from 'src/resources/checkout/entities/checkout.entity';
import { OrderFullfilmentLine } from 'src/resources/order/entities/order-fullfilment-line.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('warehouse')
export class WareHouse extends InStoreBase {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  is_private: boolean;

  @OneToMany(
    (type) => OrderFullfilmentLine,
    (fullfilmet_line) => fullfilmet_line.warehouse,
  )
  fullfilment_lines: OrderFullfilmentLine[];

  @OneToMany((type) => ProductVariantStock, (variant) => variant.warehouse)
  variant_stocks: ProductVariantStock[];

  @OneToMany((type) => Stock, (stock) => stock.warehouse)
  stocks: Stock[];

  @OneToMany((type) => CheckOut, (checkout) => checkout.collection_point)
  checkouts: CheckOut[];
}
