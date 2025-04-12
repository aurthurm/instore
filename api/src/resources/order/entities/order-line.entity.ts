import { InStoreBase } from 'src/resources/base/base.entity';
import { ProductVariant } from 'src/resources/product/entities';
import { Allocation } from 'src/resources/warehouse/entities/allocation.entity';
import { PreOrderAllocation } from 'src/resources/warehouse/entities/preorder-allocation.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderFullfilmentLine } from './order-fullfilment-line.entity';
import { Order } from './order.entity';

@Entity('order_line')
export class OrderLine extends InStoreBase {
  @ManyToOne((type) => Order, (order) => order.order_lines)
  order: Order;

  @ManyToOne(
    (type) => ProductVariant,
    (product_variant) => product_variant.order_lines,
  )
  variant: ProductVariant;

  @Column({ length: 100 })
  variant_name: string;

  @Column({ length: 100 })
  product_sku: string;

  @Column({ length: 200 })
  product_variant_id: string;

  @Column({ default: false })
  is_shipping_required: boolean;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: true })
  sale_id: string;

  @OneToMany(
    (type) => OrderFullfilmentLine,
    (fullfilment_line) => fullfilment_line.order_line,
  )
  fullfilment_lines: OrderFullfilmentLine[];

  @ManyToOne((type) => Allocation, (allocation) => allocation.order_lines)
  allocation: Allocation;

  @ManyToOne(
    (type) => PreOrderAllocation,
    (fullfilment_line) => fullfilment_line.order_lines,
  )
  preorder_allocation: PreOrderAllocation;
}
