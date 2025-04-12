import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantMetaDto } from './create-product-variant-meta.dto';

export class UpdateProductVariantMetaDto extends PartialType(
  CreateProductVariantMetaDto,
) {}
