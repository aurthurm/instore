import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductType } from '../entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async create(productType: CreateProductDto): Promise<ProductType> {
    return this.productTypeRepository.save(prepareForCreate(productType));
  }

  async readAll(query = {}): Promise<ProductType[]> {
    return await this.productTypeRepository.find(query);
  }

  async readById(id: string): Promise<ProductType> {
    return await this.productTypeRepository.findOneBy({ id });
  }

  async update(id: string, productType: UpdateProductDto): Promise<any> {
    return await this.productTypeRepository.update(
      { id },
      prepareForUpdate(productType),
    );
  }

  async delete(id): Promise<any> {
    return await this.productTypeRepository.remove(id);
  }
}
