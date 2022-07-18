import { ProductVariantAttribute } from './../entities/product-variant-attribute.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Product, ProductVariant } from '../entities';
import { ProductAttribute } from '../entities/product-attribute.entity';

export class CreateProductVariantMetaDto
  implements Readonly<CreateProductVariantMetaDto>
{
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  product_variant: ProductVariant;

  @ApiProperty()
  product_attribute: ProductAttribute;

  @ApiProperty()
  product_variant_attribute: ProductVariantAttribute;
}

export class ProductVariantMetaFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  product_variant: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  product_attribute: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  product_variant_attribute: string;
}
