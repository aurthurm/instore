import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/resources/user/entities/user.entity';
import { WareHouse } from 'src/resources/warehouse/entities/warehouse.entity';

export type CheckOutDocument = CheckOut & Document;

@Schema({
  timestamps: true,
})
export class CheckOut {
  @Prop()
  last_change: Date;

  @Prop({ type: SchemaTypes.ObjectId, red: 'User' })
  user: User;

  @Prop()
  email: string;

  @Prop()
  token: string;

  @Prop({ type: SchemaTypes.ObjectId, red: 'WareHouse' })
  collection_point: WareHouse;

  @Prop()
  note: string;

  @Prop()
  currency: string;

  @Prop()
  tracking_code: string;
}

export const CheckOutSchema = SchemaFactory.createForClass(CheckOut);
