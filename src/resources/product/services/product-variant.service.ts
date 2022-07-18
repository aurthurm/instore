import { ProductVariantMetaService } from './product-variant-meta.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductVariantsDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    private readonly productVariantMetaService: ProductVariantMetaService,
  ) {}

  async create(
    productVariant: CreateProductVariantsDto,
  ): Promise<ProductVariant[]> {
    const created = [];
    for (const var_item of productVariant?.variants) {
      for (const _ of [...Array(+var_item['quantity'])]) {
        const product_variant = await this.productVariantRepository.save({
          ...prepareForCreate(var_item),
          product: productVariant.product,
          quantity: 1,
        });
        if (product_variant) {
          created.push(product_variant);
          for (const var_meta of var_item['variant_meta']) {
            await this.productVariantMetaService.create({
              ...prepareForCreate(var_meta),
              product_variant: product_variant.id,
            });
          }
        }
      }
    }
    return created;
  }

  async readAll(query = {}): Promise<ProductVariant[]> {
    return await this.productVariantRepository.find(query);
  }

  async readById(id: string): Promise<ProductVariant> {
    return await this.productVariantRepository.findOneBy({ id });
  }

  async update(
    id: string,
    productVariant: UpdateProductVariantDto,
  ): Promise<any> {
    return await this.productVariantRepository.update(
      { id },
      prepareForUpdate(productVariant),
    );
  }

  async delete(id): Promise<any> {
    return await this.productVariantRepository.delete(id);
  }
}
