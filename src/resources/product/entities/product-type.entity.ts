import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductTypeDocument = ProductType & Document;
@Schema({
  timestamps: true,
})
export class ProductType {
  @Prop()
  name: string;

  @Prop()
  has_variants: boolean;

  @Prop()
  is_shipping_required: boolean;

  @Prop()
  is_digital: boolean;

  @Prop()
  weight: string;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
