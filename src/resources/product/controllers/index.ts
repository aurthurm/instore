import { ProductController } from './product.controller';
import { ProductVariantController } from './product-variant.controller';
import { ProductCategoryController } from './product-category.controller';
import { ProductTypeController } from './product-type.controller';
import { ProductDigitalController } from './product-digital.controller';
import { ProductCollectionController } from './product-collection.controller';
import { ProductMediaController } from './product-media.controller';

const PRODUCT_CONTROLLERS = [
  ProductController,
  ProductVariantController,
  ProductTypeController,
  ProductCategoryController,
  ProductDigitalController,
  ProductCollectionController,
  ProductMediaController,
];

export {
  ProductController,
  ProductVariantController,
  ProductTypeController,
  ProductCategoryController,
  ProductDigitalController,
  ProductCollectionController,
  ProductMediaController,
  PRODUCT_CONTROLLERS,
};
