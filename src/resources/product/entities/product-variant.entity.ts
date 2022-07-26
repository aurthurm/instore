import { ProductVariantStock } from './product-variant-stock.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { CheckOutLine } from 'src/resources/checkout/entities/checkout-line.entity';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
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

  @Column({ nullable: true })
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

  @Column({ nullable: true }) // cululative from onset
  quantity_all_time: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  quantity_available: number;

  @Column({ nullable: true })
  quantity_allocated: number;

  @Column({ nullable: true })
  quantity_limit_per_customer: number;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: false, default: 'hidden' }) // hidden, published, scheduled
  status: string;

  @Column({ nullable: false, default: 0 })
  price: number;

  @OneToMany((type) => ProductVariantMeta, (product) => product.product_variant)
  variants_meta: ProductVariantMeta[];

  @OneToMany((type) => ProductDigital, (product) => product.product_variant)
  digitals: ProductDigital[];

  @OneToMany((type) => OrderLine, (order_line) => order_line.variant)
  order_lines: OrderLine[];

  @OneToMany((type) => CheckOutLine, (checkout_line) => checkout_line.variant)
  checkout_lines: CheckOutLine[];

  // For singule unit stock management
  @Column({ nullable: true, default: true })
  has_single_units: boolean;

  // of is_single_units == true, then individual stock inits will be created
  @OneToMany(
    (type) => ProductVariantStock,
    (product) => product.product_variant,
  )
  variant_stocks: ProductVariantStock[];
}
