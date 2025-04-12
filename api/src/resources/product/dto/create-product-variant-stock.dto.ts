import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { WareHouse } from 'src/resources/warehouse/entities';
import { ProductVariant } from '../entities';

export class ProductVariantStockDto
  implements Readonly<ProductVariantStockDto>
{
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  unique_code: string;

  @ApiProperty()
  product_variant: ProductVariant;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  warehouse: WareHouse;
}

export class ProductVariantStockFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  product_variant: string;

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
