import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductDigital } from './product-digital.entity';
import { ProductMedia } from './product-media.entity';
import { Product } from './product.entity';
import { ProductVariantMeta } from './product-variant-meta.entity';

@Entity('product_variant')
export class ProductVariant extends InStoreBase {
  @ManyToOne((type) => Product, (product) => product.variants, {
    nullable: false,
  })
  product: Product;

  @Column({ unique: true, nullable: true })
  sku: string;

  @Column({ unique: true, nullable: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany((type) => ProductMedia, (product_media) => product_media.product)
  media: ProductMedia[];

  @Column({ nullable: true, default: false })
  is_pre_order: boolean;

  @Column({ nullable: true })
  pre_order_end_date: Date;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  quantity_limit_per_customer: number;

  @Column({ nullable: true })
  weight: string;

  @OneToMany((type) => ProductVariantMeta, (product) => product.product_variant)
  variants_meta: ProductVariantMeta[];

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.product_variants, {
    nullable: true,
  })
  warehouse: WareHouse;

  @OneToMany((type) => ProductDigital, (product) => product.product_variant)
  digitals: ProductDigital[];

  @OneToMany((type) => OrderLine, (order_line) => order_line.variant)
  order_lines: OrderLine[];

  @OneToMany((type) => CheckOutLine, (checkout_line) => checkout_line.variant)
  checkout_lines: CheckOutLine[];
}
