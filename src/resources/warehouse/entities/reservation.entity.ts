import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Stock } from './stock.entity';

export type ReservationDocument = Reservation & Document;

@Schema({
  timestamps: true,
})
export class Reservation {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'CheckOutline' })
  checkout_line: CheckOutLine;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Stock' })
  stock: Stock;

  @Prop()
  quantity_reserved: number;

  @Prop()
  reserved_until: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
