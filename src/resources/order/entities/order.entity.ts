import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/resources/user/entities/user.entity';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop()
  number: string;

  @Prop()
  status: string;

  @Prop()
  authorise_status: string;

  @Prop()
  charge_status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  tracking_id: string;

  @Prop()
  user_email: string;

  @Prop()
  origin: string;

  @Prop()
  currency: string;

  @Prop()
  shipping_method: string;

  @Prop()
  shipping_method_name: string;

  @Prop()
  collection_point: string; // WareHouse

  @Prop()
  collection_point_name: string;

  @Prop()
  total_amount: number;

  @Prop()
  customer_note: string;

  @Prop()
  weight: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
