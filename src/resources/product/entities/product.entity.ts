import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ProductCategory } from './product-category.entity';
import { ProductType } from './product-type.entity';
import { ProductVariant } from './product-variant.entity';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductType' })
  product_type: ProductType;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductCategory' })
  category: ProductCategory;

  @Prop()
  weight: string;

  @Prop({
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  })
  rating: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductVariant' })
  default_variant: ProductVariant;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
