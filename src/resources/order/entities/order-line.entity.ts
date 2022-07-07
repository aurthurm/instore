import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ProductVariant } from 'src/resources/product/entities/product-variant.entity';
import { Order } from './order.entity';

export type OrderLineDocument = OrderLine & Document;

@Schema({
  timestamps: true,
})
export class OrderLine {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductVariant' })
  variant: ProductVariant;

  @Prop()
  variant_name: string;

  @Prop()
  product_sku: string;

  @Prop()
  product_variant_id: string;

  @Prop()
  is_shipping_required: boolean;

  @Prop()
  quantity: number;

  @Prop()
  sale_id: string;
}
export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);
