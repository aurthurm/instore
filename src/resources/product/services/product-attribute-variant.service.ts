import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import {
  CreateProductVariantAttributeDto,
  ProductVariantAttributeFilter,
} from '../dto/create-product-variant-attribute.dto';
import { UpdateProductVariantAttributeDto } from '../dto/update-product-variant-attribute.dto';
import { ProductVariantAttribute } from '../entities/product-variant-attribute.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductVariantAttributeService {
  constructor(
    @InjectRepository(ProductVariantAttribute)
    private productVariantAttributeRepository: Repository<ProductVariantAttribute>,
  ) {}

  async create(
    productVariantAttribute: CreateProductVariantAttributeDto,
  ): Promise<ProductVariantAttribute> {
    return this.productVariantAttributeRepository.save(
      prepareForCreate(productVariantAttribute),
    );
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductVariantAttributeFilter,
  ): Promise<Pagination<ProductVariantAttribute>> {
    return await paginate<ProductVariantAttribute>(
      this.productVariantAttributeRepository,
      options,
      filters as any,
    );
  }

  async readById(id: string): Promise<ProductVariantAttribute> {
    return await this.productVariantAttributeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    productVariantAttribute: UpdateProductVariantAttributeDto,
  ): Promise<any> {
    await this.productVariantAttributeRepository.update(
      { id },
      prepareForUpdate(productVariantAttribute),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.productVariantAttributeRepository.delete(id);
  }
}
