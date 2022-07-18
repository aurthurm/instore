import { CreateProductCategoryDto } from './create-product-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {}
