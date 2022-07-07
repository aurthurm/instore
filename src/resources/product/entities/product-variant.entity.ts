import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductVariantDocument = ProductVariant & Document;
@Schema({
  timestamps: true,
})
export class ProductVariant {
  @Prop()
  sku: string;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  media: [];

  @Prop()
  is_pre_order: boolean;

  @Prop()
  ipre_order_end_date: boolean;

  @Prop()
  quantity_limit_per_customer: boolean;

  @Prop()
  weight: string;
}

export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);
