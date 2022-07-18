import { ProductVariant } from 'src/resources/product/entities/product-variant.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { ProductAttribute } from './product-attribute.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('product_variant_meta')
export class ProductVariantMeta extends InStoreBase {
  @ManyToOne((type) => ProductVariant, (product) => product.variants_meta, {
    nullable: false,
  })
  product_variant: ProductVariant;

  @ManyToOne((type) => ProductAttribute, (pa) => pa.variants_meta, {
    nullable: false,
  })
  product_attribute: ProductAttribute;

  @ManyToOne((type) => ProductVariantAttribute, (pva) => pva.variants_meta, {
    nullable: false,
  })
  product_variant_attribute: ProductVariantAttribute;
}
