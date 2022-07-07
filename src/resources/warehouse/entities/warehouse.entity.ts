import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WareHouseDocument = WareHouse & Document;

@Schema({
  timestamps: true,
})
export class WareHouse {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  is_private: boolean;
}

export const WareHouseSchema = SchemaFactory.createForClass(WareHouse);
