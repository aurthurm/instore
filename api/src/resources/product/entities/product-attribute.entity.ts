import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ProductVariantMeta } from './product-variant-meta.entity';

@Entity('product_attribute')
export class ProductAttribute extends InStoreBase {
  @ManyToOne((type) => Product, (product) => product.attributes, {
    nullable: false,
  })
  product: Product;

  @OneToMany((type) => ProductVariantMeta, (pva) => pva.product_attribute)
  variants_meta: ProductVariantMeta[];

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany((type) => ProductVariantAttribute, (pva) => pva.product_attribute)
  attribute_variants: ProductVariantAttribute[];
}
