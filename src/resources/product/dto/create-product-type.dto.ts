import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from '../entities';

export class CreateProductTypeDto implements Readonly<CreateProductTypeDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  has_variants: boolean;

  @ApiProperty()
  is_shipping_required: boolean;

  @ApiProperty()
  is_digital: boolean;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  products: Product[];
}

export class ProductTypeFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  has_variants: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_shipping_required: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_digital: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  weight: string;
}
