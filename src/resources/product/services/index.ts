import { ProductVariantStockService } from './product-variant-stock.service';
import { ProductVariantMetaService } from './product-variant-meta.service';
import { ProductVariantAttributeService } from './product-attribute-variant.service';
import { ProductService } from './product.service';
import { ProductVariantService } from './product-variant.service';
import { ProductCategoryService } from './product-category.service';
import { ProductTypeService } from './product-type.service';
import { ProductDigitalService } from './product-digital.service';
import { ProductCollectionService } from './product-collection.service';
import { ProductMediaService } from './product-media.service';
import { ProductAttributeService } from './product-attribute.service';

const PRODUCT_SERVICES = [
  ProductService,
  ProductVariantAttributeService,
  ProductAttributeService,
  ProductVariantService,
  ProductVariantStockService,
  ProductVariantMetaService,
  ProductTypeService,
  ProductCategoryService,
  ProductDigitalService,
  ProductCollectionService,
  ProductMediaService,
];

export {
  ProductService,
  ProductVariantAttributeService,
  ProductAttributeService,
  ProductVariantService,
  ProductVariantMetaService,
  ProductVariantStockService,
  ProductTypeService,
  ProductCategoryService,
  ProductDigitalService,
  ProductCollectionService,
  ProductMediaService,
  PRODUCT_SERVICES,
};
