import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDigital } from '../entities/product-digital.entity';

@Injectable()
export class ProductDigitalService {
  constructor(
    @InjectRepository(ProductDigital)
    private productRepository: Repository<ProductDigital>,
  ) {}

  async create(productDigital: CreateProductDto): Promise<ProductDigital> {
    return this.productRepository.save(prepareForCreate(productDigital));
  }

  async readAll(): Promise<ProductDigital[]> {
    return await this.productRepository.find();
  }

  async readById(id: string): Promise<ProductDigital> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, productDigital: UpdateProductDto): Promise<any> {
    return await this.productRepository.update(
      id,
      prepareForUpdate(productDigital),
    );
  }

  async delete(id): Promise<any> {
    return await this.productRepository.remove(id);
  }
}
