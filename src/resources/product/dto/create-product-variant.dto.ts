import { ProductVariantMeta } from 'src/resources/product/entities/product-variant-meta.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CheckOutLine } from 'src/resources/checkout/entities';
import { OrderLine } from 'src/resources/order/entities';
import { WareHouse } from 'src/resources/warehouse/entities';
import { Product, ProductDigital, ProductMedia } from '../entities';

export class CreateProductVariantsDto
  implements Readonly<CreateProductVariantsDto>
{
  @ApiProperty()
  product: Product;

  @ApiProperty()
  variants: ProductVariantDto[];
}

export class ProductVariantDto implements Readonly<ProductVariantDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  product: Product;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  media: ProductMedia[];

  @ApiProperty()
  is_pre_order: boolean;

  @ApiProperty()
  pre_order_end_date: boolean;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  quantity_limit_per_customer: number;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  warehouse: WareHouse;

  @ApiProperty()
  variant_meta: ProductVariantMeta[];

  @ApiProperty()
  digitals: ProductDigital[];

  @ApiProperty()
  order_lines: OrderLine[];

  @ApiProperty()
  checkout_lines: CheckOutLine[];
}
