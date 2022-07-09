import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString, IsUUID } from 'class-validator';
import { User } from 'src/resources/user/entities/user.entity';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductType } from '../entities/product-type.entity';
import { ProductVariant } from '../entities/product-variant.entity';

export class CreateProductDto implements Readonly<CreateProductDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  slug: string;

  @ApiProperty({ type: 'text' })
  @IsString()
  description: string;

  @ApiProperty({})
  product_type: ProductType;

  @ApiProperty({})
  category: ProductCategory;

  @ApiProperty({})
  @IsString()
  weight: string;

  @ApiProperty({})
  @IsNumber()
  rating: number;

  @ApiProperty({})
  @IsObject()
  default_variant: ProductVariant;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: string;

  @ApiProperty({ required: true })
  @IsString()
  updatedBy: string;

  public static from(dto: Partial<CreateProductDto>) {
    const it = new CreateProductDto();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: CreateProductDto) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
    });
  }

  public toEntity(user: User = null) {
    const it = new CreateProductDto();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createdBy = user ? user.id : null;
    return it;
  }
}
