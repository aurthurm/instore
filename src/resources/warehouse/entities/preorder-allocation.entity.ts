import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';

export type PreOrderAllocationDocument = PreOrderAllocation & Document;

@Schema({
  timestamps: true,
})
export class PreOrderAllocation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'OrderLine' })
  order_line: OrderLine;

  @Prop()
  quantity: number;
}

export const PreOrderAllocationSchema =
  SchemaFactory.createForClass(PreOrderAllocation);
