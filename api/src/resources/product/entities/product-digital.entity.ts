import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('product_digital')
export class ProductDigital extends InStoreBase {
  @Column()
  automatic_fullfillment: boolean;

  @Column()
  content_type: string;

  @ManyToOne(
    (type) => ProductVariant,
    (product_variat) => product_variat.digitals,
  )
  product_variant: ProductVariant;

  @Column()
  content_file: string;

  @Column()
  max_downloads: number;

  @Column()
  url_valid_days: number;
}
