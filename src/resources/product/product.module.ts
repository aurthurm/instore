import { Module } from '@nestjs/common';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCollectionController } from './controllers/product-collection.controller';
import { ProductDigitalController } from './controllers/product-digital.controller';
import { ProductMediaController } from './controllers/product-media.controller';
import { ProductTypeController } from './controllers/product-type.controller';
import { ProductVariantController } from './controllers/product-variant.controller';
import { ProductController } from './controllers/product.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCollectionService } from './services/product-collection.service';
import { ProductDigitalService } from './services/product-digital.service';
import { ProductMediaService } from './services/product-media.service';
import { ProductTypeService } from './services/product-type.service';
import { ProductVariantService } from './services/product-variant.service';
import { ProductService } from './services/product.service';

@Module({
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductTypeController,
    ProductCollectionController,
    ProductVariantController,
    ProductMediaController,
    ProductDigitalController,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductTypeService,
    ProductCollectionService,
    ProductVariantService,
    ProductMediaService,
    ProductDigitalService,
  ],
})
export class ProductModule {}
