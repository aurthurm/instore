import { InStoreBase } from 'src/resources/base/base.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('product_variant_stock')
export class ProductVariantStock extends InStoreBase {
  @ManyToOne((type) => ProductVariant, (product) => product.variant_stocks, {
    nullable: false,
  })
  product_variant: ProductVariant;

  @Column({ nullable: true })
  unique_code: string;

  @Column({ nullable: true, default: 1 })
  quantity: number;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: false, default: 'hidden' }) // hidden, published, scheduled
  status: string;

  @Column({ nullable: false, default: 0 })
  price: number;

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.variant_stocks, {
    nullable: true,
  })
  warehouse: WareHouse;
}
