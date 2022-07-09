import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductCollection } from '../entities/product-collection.entity';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';

@Injectable()
export class ProductCollectionService {
  constructor(
    @InjectRepository(ProductCollection)
    private productRepository: Repository<ProductCollection>,
  ) {}

  async create(
    productCollection: CreateProductDto,
  ): Promise<ProductCollection> {
    return this.productRepository.save(prepareForCreate(productCollection));
  }

  async readAll(): Promise<ProductCollection[]> {
    return await this.productRepository.find();
  }

  async readById(id: string): Promise<ProductCollection> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id, productCollection: UpdateProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(
      id,
      prepareForUpdate(productCollection),
    );
  }

  async delete(id): Promise<any> {
    return await this.productRepository.remove(id);
  }
}
