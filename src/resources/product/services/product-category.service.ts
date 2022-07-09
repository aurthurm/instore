import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productRepository: Repository<ProductCategory>,
  ) {}

  async create(productCategory: CreateProductDto): Promise<ProductCategory> {
    return this.productRepository.save(prepareForCreate(productCategory));
  }

  async readAll(query = {}): Promise<ProductCategory[]> {
    return await this.productRepository.find(query);
  }

  async readById(id: string): Promise<ProductCategory> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(
    id,
    productCategory: UpdateProductDto,
  ): Promise<ProductCategory> {
    const productCat = await this.readById(id);
    return await this.productRepository.save(
      Object.assign(productCat, productCategory),
    );
  }

  async delete(id): Promise<any> {
    return await this.productRepository.remove(id);
  }
}
