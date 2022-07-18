import { ProductVariantAttributeController } from './product-attribute-variant.controller';
import { ProductAttributeController } from './product-attribute.controller';
import { ProductController } from './product.controller';
import { ProductVariantController } from './product-variant.controller';
import { ProductCategoryController } from './product-category.controller';
import { ProductTypeController } from './product-type.controller';
import { ProductDigitalController } from './product-digital.controller';
import { ProductCollectionController } from './product-collection.controller';
import { ProductMediaController } from './product-media.controller';
import { ProductVariantMetaController } from './product-variant-meta.controller';

const PRODUCT_CONTROLLERS = [
  ProductController,
  ProductAttributeController,
  ProductVariantAttributeController,
  ProductVariantController,
  ProductVariantMetaController,
  ProductTypeController,
  ProductCategoryController,
  ProductDigitalController,
  ProductCollectionController,
  ProductMediaController,
];

export {
  ProductController,
  ProductAttributeController,
  ProductVariantAttributeController,
  ProductVariantController,
  ProductVariantMetaController,
  ProductTypeController,
  ProductCategoryController,
  ProductDigitalController,
  ProductCollectionController,
  ProductMediaController,
  PRODUCT_CONTROLLERS,
};
