import { ProductAttribute } from './product-attribute.entity';
import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { ProductCollection } from './product-collection.entity';
import { ProductType } from './product-type.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('product')
export class Product extends InStoreBase {
  @Column({ length: 200, unique: true, nullable: false })
  name: string;

  @Column({ length: 200, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true, default: 'hidden' }) // hidden, published, scheduled
  status: string;

  @Column({ nullable: true, default: 0 })
  price: number;

  @ManyToOne((type) => ProductType, (product_type) => product_type.products, {
    nullable: true,
  })
  product_type: ProductType;

  @ManyToOne(
    (type) => ProductCategory,
    (product_category) => product_category.products,
    { nullable: true },
  )
  category: ProductCategory;

  @Column({ length: 200, nullable: true })
  weight: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(
    (type) => ProductVariant,
    (product_variant) => product_variant.product,
  )
  variants: ProductVariant[];

  @OneToMany(
    (type) => ProductAttribute,
    (product_attribute) => product_attribute.product,
  )
  attributes: ProductAttribute[];

  @ManyToOne(
    (type) => ProductCollection,
    (product_collection) => product_collection.products,
    { nullable: true },
  )
  collection: ProductCollection;
}
