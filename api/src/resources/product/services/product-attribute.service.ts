import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import {
  CreateProductAttributeDto,
  ProductAttributeFilter,
} from '../dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from '../dto/update-product-attribute.dto';
import { ProductAttribute } from '../entities/product-attribute.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: Repository<ProductAttribute>,
  ) {}

  async create(
    productAttribute: CreateProductAttributeDto,
  ): Promise<ProductAttribute> {
    return this.productAttributeRepository.save(
      prepareForCreate(productAttribute),
    );
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductAttributeFilter,
  ): Promise<Pagination<ProductAttribute>> {
    return await paginate<ProductAttribute>(
      this.productAttributeRepository,
      options,
      filters as any,
    );
  }

  async readBy(filters: ProductAttributeFilter): Promise<ProductAttribute[]> {
    const results = await this.productAttributeRepository
      .createQueryBuilder('pro_attr')
      .leftJoinAndSelect('pro_attr.attribute_variants', 'attribute_variant')
      .innerJoinAndSelect('pro_attr.product', 'product')
      .where('(product.id = :prodId)')
      .setParameters({ prodId: filters.product })
      .getMany();
    // .where("product.id = :product", { product })
    return results;
  }

  async readById(id: string): Promise<ProductAttribute> {
    return await this.productAttributeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    productAttribute: UpdateProductAttributeDto,
  ): Promise<any> {
    await this.productAttributeRepository.update(
      { id },
      prepareForUpdate(productAttribute),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.productAttributeRepository.delete(id);
  }
}
