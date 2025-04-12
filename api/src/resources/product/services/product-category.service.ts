import { UpdateProductCategoryDto } from './../dto/update-product-category.dto';
import { CreateProductCategoryDto } from './../dto/create-product-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import slugify from 'slugify';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { ProductCategoryFilter } from '../dto/create-product-category.dto';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(
    productCategory: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryRepository.save(
      prepareForCreate({
        ...productCategory,
        slug: slugify(productCategory.name),
      }),
    );
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductCategoryFilter,
  ): Promise<Pagination<ProductCategory>> {
    return await paginate<ProductCategory>(
      this.productCategoryRepository,
      options,
      filters as any,
    );
  }

  async readById(id: string): Promise<ProductCategory> {
    return await this.productCategoryRepository.findOneBy({ id });
  }

  async update(
    id,
    productCategory: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const productCat = await this.readById(id);
    return await this.productCategoryRepository.save(
      Object.assign(productCat, prepareForUpdate(productCategory)),
    );
  }

  async delete(id): Promise<any> {
    return await this.productCategoryRepository.delete(id);
  }
}
