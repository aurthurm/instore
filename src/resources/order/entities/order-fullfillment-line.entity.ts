import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { OrderFullfilment } from './order-fulfillment.entity';
import { OrderLine } from './order-line.entity';

export type OrderFullfilmentLineDocument = OrderFullfilmentLine & Document;

@Schema({
  timestamps: true,
})
export class OrderFullfilmentLine {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderLine' })
  order_line: OrderLine;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderFullfilment' })
  fullfilment: OrderFullfilment;

  @Prop()
  quantity: number;

  @Prop()
  warehouse: string;
}
export const OrderFullfilmentLineSchema =
  SchemaFactory.createForClass(OrderFullfilmentLine);
