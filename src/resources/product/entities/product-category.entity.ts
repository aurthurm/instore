import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_category')
export class ProductCategory extends InStoreBase {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}
