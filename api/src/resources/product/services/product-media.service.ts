import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductMedia } from '../entities/product-media.entity';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectRepository(ProductMedia)
    private productMediaRepository: Repository<ProductMedia>,
  ) {}

  async create(productMedia: CreateProductDto): Promise<ProductMedia> {
    return this.productMediaRepository.save(prepareForCreate(productMedia));
  }

  async readAll(query = {}): Promise<ProductMedia[]> {
    return await this.productMediaRepository.find(query);
  }

  async readById(id: string): Promise<ProductMedia> {
    return await this.productMediaRepository.findOneBy({ id });
  }

  async update(id: string, productMedia: UpdateProductDto): Promise<any> {
    return await this.productMediaRepository.update(
      { id },
      prepareForUpdate(productMedia),
    );
  }

  async delete(id): Promise<any> {
    return await this.productMediaRepository.delete(id);
  }
}
