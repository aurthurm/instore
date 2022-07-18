import { CreateProductVariantAttributeDto } from './create-product-variant-attribute.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductVariantAttributeDto extends PartialType(
  CreateProductVariantAttributeDto,
) {}
