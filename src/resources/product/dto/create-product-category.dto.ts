import { Product } from './../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductCategoryDto
  implements Readonly<CreateProductCategoryDto>
{
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  products: Product[];
}

export class ProductCategoryFilter {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  slug: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  products: Product[];
}
