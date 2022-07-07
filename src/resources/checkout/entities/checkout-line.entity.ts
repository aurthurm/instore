import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ProductVariant } from 'src/resources/product/entities/product-variant.entity';
import { CheckOut } from './checkout.entity';

export type CheckOutLineDocument = CheckOutLine & Document;

@Schema({
  timestamps: true,
})
export class CheckOutLine {
  @Prop({ type: SchemaTypes.ObjectId, red: 'CheckOut' })
  checkout: CheckOut;

  @Prop({ type: SchemaTypes.ObjectId, red: 'ProductVariant' })
  variant: ProductVariant;

  @Prop()
  quantity: number;

  @Prop()
  price_override: boolean;
}

export const CheckOutLineSchema = SchemaFactory.createForClass(CheckOutLine);
