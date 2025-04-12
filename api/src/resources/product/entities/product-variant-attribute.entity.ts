import { ProductVariantMeta } from 'src/resources/product/entities/product-variant-meta.entity';
import { ProductAttribute } from './product-attribute.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variant_attribute')
export class ProductVariantAttribute extends InStoreBase {
  @ManyToOne((type) => Product, (product) => product.variants, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(
    (type) => ProductAttribute,
    (product_attribute) => product_attribute.attribute_variants,
    {
      nullable: false,
    },
  )
  product_attribute: ProductAttribute;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(
    (type) => ProductVariantMeta,
    (pva) => pva.product_variant_attribute,
  )
  variants_meta: ProductVariantMeta[];
}
