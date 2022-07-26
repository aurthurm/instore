import { ProductVariantStock } from './../entities/product-variant-stock.entity';
import { ProductVariantMeta } from 'src/resources/product/entities/product-variant-meta.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { ProductAttribute } from './product-attribute.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductCategory } from './product-category.entity';
import { ProductType } from './product-type.entity';
import { ProductDigital } from './product-digital.entity';
import { ProductCollection } from './product-collection.entity';
import { ProductMedia } from './product-media.entity';

const PRODUCT_ENTITIES = [
  Product,
  ProductAttribute,
  ProductVariantAttribute,
  ProductVariantMeta,
  ProductVariant,
  ProductVariantStock,
  ProductType,
  ProductCategory,
  ProductDigital,
  ProductCollection,
  ProductMedia,
];

export {
  Product,
  ProductAttribute,
  ProductVariantAttribute,
  ProductVariantMeta,
  ProductVariant,
  ProductVariantStock,
  ProductType,
  ProductCategory,
  ProductDigital,
  ProductCollection,
  ProductMedia,
  PRODUCT_ENTITIES,
};
