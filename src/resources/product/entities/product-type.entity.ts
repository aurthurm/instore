import { InStoreBase } from 'src/resources/base/base.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_type')
export class ProductType extends InStoreBase {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  has_variants: boolean;

  @Column()
  is_shipping_required: boolean;

  @Column()
  is_digital: boolean;

  @Column()
  weight: string;

  @OneToMany((type) => Product, (product) => product.product_type)
  products: Product[];
}
