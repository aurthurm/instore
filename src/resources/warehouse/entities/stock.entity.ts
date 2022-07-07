import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ProductVariant } from 'src/resources/product/entities/product-variant.entity';
import { WareHouse } from './warehouse.entity';

export type StockDocument = Stock & Document;

@Schema({
  timestamps: true,
})
export class Stock {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'WareHouse' })
  warehouse: WareHouse;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductVariant' })
  product_variant: ProductVariant;

  @Prop()
  quantity: number;

  @Prop()
  quantity_allocated: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
