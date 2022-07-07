import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';
import { Stock } from './stock.entity';

export type AllocationDocument = Allocation & Document;

@Schema({
  timestamps: true,
})
export class Allocation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderLine' })
  order_line: OrderLine;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Stock' })
  stock: Stock;

  @Prop()
  quantity_allocated: number;
}

export const AllocationSchema = SchemaFactory.createForClass(Allocation);
