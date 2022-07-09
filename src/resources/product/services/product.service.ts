import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(prepareForCreate(product));
  }

  async readAll(query = {}): Promise<Product[]> {
    return await this.productRepository.find(query);
  }

  async readById(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, product: UpdateProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(
      { id },
      prepareForUpdate(product),
    );
  }

  async delete(id): Promise<any> {
    return await this.productRepository.remove(id);
  }
}
