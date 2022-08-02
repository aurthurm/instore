import { ProductVariantStockDto } from './../dto/create-product-variant-stock.dto';
import { ProductVariantStockService } from './product-variant-stock.service';
import { ProductVariantFilter } from './../dto/create-product-variant.dto';
import { ProductVariantMetaService } from './product-variant-meta.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductVariantsDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductVariant } from '../entities/product-variant.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    private readonly productVariantMetaService: ProductVariantMetaService,
    private readonly productVariantStockService: ProductVariantStockService,
  ) {}

  async create(
    productVariant: CreateProductVariantsDto,
  ): Promise<ProductVariant[]> {
    const created = [];
    for (const var_item of productVariant?.variants) {
      console.log(`Adding Variant ...`);
      const product_variant = await this.productVariantRepository.save({
        ...prepareForCreate(var_item),
        product: productVariant.product,
      });
      if (product_variant) {
        console.log(`Atacking Variant Meta to Variant ...`);
        for (const var_meta of var_item['variant_meta']) {
          await this.productVariantMetaService.create({
            ...prepareForCreate(var_meta),
            product_variant: product_variant.id,
          });
        }

        if (product_variant.has_single_units) {
          const variant_stock = new ProductVariantStockDto();
          Object.assign(variant_stock, {
            ...var_item,
            quantity: 1,
            product_variant,
          });
          await this.productVariantStockService.create(
            variant_stock,
            var_item.quantity,
          );
        }
        created.push(await this.readById(product_variant.id));
      }
    }
    return created;
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductVariantFilter,
  ): Promise<Pagination<ProductVariant>> {
    return await paginate<ProductVariant>(
      this.productVariantRepository,
      options,
      {
        ...filters,
        relations: [
          'product',
          'product.category',
          'product.product_type',
          'variants_meta',
          'variants_meta.product_attribute',
          'variants_meta.product_variant_attribute',
        ],
      } as any,
    );
  }

  async readById(id: string): Promise<ProductVariant> {
    return await this.productVariantRepository.findOne({
      where: { id },
      relations: [
        'product',
        'product.category',
        'product.product_type',
        'variants_meta',
        'variants_meta.product_attribute',
        'variants_meta.product_variant_attribute',
      ],
    });
  }

  async update(
    id: string,
    productVariant: UpdateProductVariantDto,
  ): Promise<any> {
    await this.productVariantRepository.update(
      { id },
      prepareForUpdate(productVariant),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.productVariantRepository.delete(id);
  }

  async addVariantStocks(payload: any): Promise<ProductVariant> {
    const product_variant = await this.readById(payload.product_variant);
    await this.update(product_variant.id, {
      quantity: (+product_variant.quantity ?? 0) + +payload.quantity,
    });
    if (product_variant.has_single_units) {
      const variant_stock = new ProductVariantStockDto();
      Object.assign(variant_stock, {
        ...product_variant,
        quantity: 1,
        product_variant,
        warehouse: payload.warehouse,
      });
      delete variant_stock.id;
      await this.productVariantStockService.create(
        variant_stock,
        payload.quantity,
      );
    }
    return await this.readById(product_variant.id);
  }

  async transferVariantStocks(payload: any): Promise<void> {
    await this.productVariantStockService.transferVariantStocks(payload);
  }

  async getStockTransferData(id: string): Promise<any> {
    const product_variant = await this.readById(id);
    return await this.productVariantStockService.getTransferData(
      product_variant.id,
    );
  }
}
