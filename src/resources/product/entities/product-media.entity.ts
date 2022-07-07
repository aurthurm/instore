import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductMediaDocument = ProductMedia & Document;
@Schema({
  timestamps: true,
})
export class ProductMedia {
  @Prop()
  product: string;

  @Prop()
  image: string;

  @Prop()
  alt: string;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
