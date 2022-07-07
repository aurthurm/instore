import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductCategoryDocument = ProductCategory & Document;
@Schema({
  timestamps: true,
})
export class ProductCategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
