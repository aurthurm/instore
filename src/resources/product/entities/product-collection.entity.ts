import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductCollectionDocument = ProductCollection & Document;
@Schema({
  timestamps: true,
})
export class ProductCollection {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  products: [];

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export const ProductCollectionSchema =
  SchemaFactory.createForClass(ProductCollection);
