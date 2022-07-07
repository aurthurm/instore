import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Order } from './order.entity';

export type OrderFullfilmentDocument = OrderFullfilment & Document;

@Schema({
  timestamps: true,
})
export class OrderFullfilment {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  status: string;

  @Prop()
  tracking_number: string;
}
export const OrderFullfilmentSchema =
  SchemaFactory.createForClass(OrderFullfilment);
