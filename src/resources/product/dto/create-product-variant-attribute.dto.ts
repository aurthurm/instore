import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from '../entities';
import { ProductAttribute } from '../entities/product-attribute.entity';

export class CreateProductVariantAttributeDto
  implements Readonly<CreateProductVariantAttributeDto>
{
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  product: Product;

  @ApiProperty()
  product_attribute: ProductAttribute;
}

export class ProductVariantAttributeFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  product: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  product_attribute: string;
}
