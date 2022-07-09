import { ProductService } from './product.service';
import { ProductVariantService } from './product-variant.service';
import { ProductCategoryService } from './product-category.service';
import { ProductTypeService } from './product-type.service';
import { ProductDigitalService } from './product-digital.service';
import { ProductCollectionService } from './product-collection.service';
import { ProductMediaService } from './product-media.service';

const PRODUCT_SERVICES = [
  ProductService,
  ProductVariantService,
  ProductTypeService,
  ProductCategoryService,
  ProductDigitalService,
  ProductCollectionService,
  ProductMediaService,
];

export {
  ProductService,
  ProductVariantService,
  ProductTypeService,
  ProductCategoryService,
  ProductDigitalService,
  ProductCollectionService,
  ProductMediaService,
  PRODUCT_SERVICES,
};
