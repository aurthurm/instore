import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('product_media')
export class ProductMedia extends InStoreBase {
  @ManyToOne((type) => ProductVariant, (product) => product.media)
  product: ProductVariant;

  @Column()
  image: string;

  @Column()
  alt: string;
}
