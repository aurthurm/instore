import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { ProductCollection } from './product-collection.entity';
import { ProductType } from './product-type.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('product')
export class Product extends InStoreBase {
  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne((type) => ProductType, (product_type) => product_type.products)
  product_type: ProductType;

  @ManyToOne(
    (type) => ProductCategory,
    (product_category) => product_category.products,
  )
  category: ProductCategory;

  @Column({ length: 200, nullable: true })
  weight: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne(
    (type) => ProductVariant,
    (product_variant) => product_variant.products,
  )
  default_variant: ProductVariant;

  @ManyToOne(
    (type) => ProductCollection,
    (product_collection) => product_collection.products,
  )
  collection: ProductCollection;
}
