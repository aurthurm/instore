import { InStoreBase } from 'src/resources/base/base.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { OrderFullfilment } from './order-fullfilment.entity';
import { OrderLine } from './order-line.entity';

@Entity('order_fullfilment_line')
export class OrderFullfilmentLine extends InStoreBase {
  @ManyToOne((type) => OrderLine, (order_line) => order_line.fullfilment_lines)
  order_line: OrderLine;

  @ManyToOne(
    (type) => OrderFullfilment,
    (fullfilment) => fullfilment.fullfilment_lines,
  )
  fullfilment: OrderFullfilment;

  @Column()
  quantity: number;

  @ManyToOne((type) => WareHouse, (warehouse) => warehouse.fullfilment_lines)
  warehouse: WareHouse;
}
