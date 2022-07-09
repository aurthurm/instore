import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_collection')
export class ProductCollection extends InStoreBase {
  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany((type) => Product, (product) => product.collection)
  products: Product[];

  @Column()
  image: string;

  @Column()
  description: string;
}
