import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from '../entities';

export class CreateProductAttributeDto
  implements Readonly<CreateProductAttributeDto>
{
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  product: Product;
}

export class ProductAttributeFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  product: string;
}
