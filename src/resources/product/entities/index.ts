import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductCategory } from './product-category.entity';
import { ProductType } from './product-type.entity';
import { ProductDigital } from './product-digital.entity';
import { ProductCollection } from './product-collection.entity';
import { ProductMedia } from './product-media.entity';

const PRODUCT_ENTITIES = [
  Product,
  ProductVariant,
  ProductType,
  ProductCategory,
  ProductDigital,
  ProductCollection,
  ProductMedia,
];

export {
  Product,
  ProductVariant,
  ProductType,
  ProductCategory,
  ProductDigital,
  ProductCollection,
  ProductMedia,
  PRODUCT_ENTITIES,
};
