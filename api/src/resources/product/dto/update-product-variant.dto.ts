import { PartialType } from '@nestjs/mapped-types';
import { ProductVariantDto } from './create-product-variant.dto';

export class UpdateProductVariantDto extends PartialType(ProductVariantDto) {}
