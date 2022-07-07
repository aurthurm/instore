import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductVariant } from './product-variant.entity';

export type ProductDigitalDocument = ProductDigital & Document;
@Schema({
  timestamps: true,
})
export class ProductDigital {
  @Prop()
  automatic_fullfillment: boolean;

  @Prop()
  content_type: string;

  @Prop()
  product_variant: ProductVariant;

  @Prop()
  content_file: string;

  @Prop()
  max_downloads: number;

  @Prop()
  url_valid_days: number;
}

export const ProductDigitalSchema =
  SchemaFactory.createForClass(ProductDigital);
