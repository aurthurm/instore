import { ProductVariantStock } from './../entities/product-variant-stock.entity';
import { ProductVariantMeta } from 'src/resources/product/entities/product-variant-meta.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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
  quantity_all: number;

  @ApiProperty()
  quantity_availabale: number;

  @ApiProperty()
  quantity_allocated: number;

  @ApiProperty()
  quantity_limit_per_customer: number;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;

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

  @ApiProperty()
  has_single_units: boolean;

  @ApiProperty()
  variant_stocks: ProductVariantStock[];
}

export class ProductVariantFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  product: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  sku: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_pre_order: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  weight: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  warehouse: string;
}
