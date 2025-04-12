import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import {
  CreateProductTypeDto,
  ProductTypeFilter,
} from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ProductType } from '../entities/product-type.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async create(productType: CreateProductTypeDto): Promise<ProductType> {
    return this.productTypeRepository.save(prepareForCreate(productType));
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductTypeFilter,
  ): Promise<Pagination<ProductType>> {
    return await paginate<ProductType>(
      this.productTypeRepository,
      options,
      filters,
    );
  }

  async readById(id: string): Promise<ProductType> {
    return await this.productTypeRepository.findOneBy({ id });
  }

  async update(id: string, productType: UpdateProductTypeDto): Promise<any> {
    await this.productTypeRepository.update(
      { id },
      prepareForUpdate(productType),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.productTypeRepository.delete(id);
  }
}
