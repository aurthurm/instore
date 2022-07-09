import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async create(productVariant: CreateProductDto): Promise<ProductVariant> {
    return this.productVariantRepository.save(prepareForCreate(productVariant));
  }

  async readAll(query = {}): Promise<ProductVariant[]> {
    return await this.productVariantRepository.find(query);
  }

  async readById(id: string): Promise<ProductVariant> {
    return await this.productVariantRepository.findOneBy({ id });
  }

  async update(id: string, productVariant: UpdateProductDto): Promise<any> {
    return await this.productVariantRepository.update(
      { id },
      prepareForUpdate(productVariant),
    );
  }

  async delete(id): Promise<any> {
    return await this.productVariantRepository.remove(id);
  }
}
