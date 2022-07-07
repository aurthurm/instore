import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { OrderLine } from 'src/resources/order/entities/order-line.entity';

export type PreOrderReservationDocument = PreOrderReservation & Document;

@Schema({
  timestamps: true,
})
export class PreOrderReservation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'CheckOutline' })
  checkout_line: CheckOutLine;

  @Prop()
  quantity_reserved: number;

  @Prop()
  reserved_until: Date;
}

export const PreOrderReservationSchema =
  SchemaFactory.createForClass(PreOrderReservation);
