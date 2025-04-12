import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import {
  CreateProductVariantMetaDto,
  ProductVariantMetaFilter,
} from '../dto/create-product-variant-meta.dto';
import { UpdateProductVariantMetaDto } from '../dto/update-product-variant-meta.dto';
import { ProductVariantMeta } from '../entities/product-variant-meta.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductVariantMetaService {
  constructor(
    @InjectRepository(ProductVariantMeta)
    private productVariantMetaRepository: Repository<ProductVariantMeta>,
  ) {}

  async create(
    productVariantMeta: CreateProductVariantMetaDto,
  ): Promise<ProductVariantMeta> {
    return this.productVariantMetaRepository.save(
      prepareForCreate(productVariantMeta),
    );
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductVariantMetaFilter,
  ): Promise<Pagination<ProductVariantMeta>> {
    return await paginate<ProductVariantMeta>(
      this.productVariantMetaRepository,
      options,
      filters as any,
    );
  }

  async readById(id: string): Promise<ProductVariantMeta> {
    return await this.productVariantMetaRepository.findOneBy({ id });
  }

  async update(
    id: string,
    productVariantMeta: UpdateProductVariantMetaDto,
  ): Promise<any> {
    await this.productVariantMetaRepository.update(
      { id },
      prepareForUpdate(productVariantMeta),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.productVariantMetaRepository.delete(id);
  }
}
