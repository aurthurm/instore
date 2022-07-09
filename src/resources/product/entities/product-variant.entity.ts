import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductDigital } from './product-digital.entity';
import { ProductMedia } from './product-media.entity';
import { Product } from './product.entity';

@Entity('product_variant')
export class ProductVariant extends InStoreBase {
  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @OneToMany((type) => ProductMedia, (product_media) => product_media.product)
  media: ProductMedia[];

  @Column()
  is_pre_order: boolean;

  @Column()
  ipre_order_end_date: boolean;

  @Column()
  quantity_limit_per_customer: boolean;

  @Column()
  weight: string;

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.product_variants)
  warehouse: WareHouse;

  @OneToMany((type) => Product, (product) => product.default_variant)
  products: Product[];

  @OneToMany((type) => ProductDigital, (product) => product.product_variant)
  digitals: ProductDigital[];

  @OneToMany((type) => OrderLine, (order_line) => order_line.variant)
  order_lines: OrderLine[];

  @OneToMany((type) => CheckOutLine, (checkout_line) => checkout_line.variant)
  checkout_lines: CheckOutLine[];
}
