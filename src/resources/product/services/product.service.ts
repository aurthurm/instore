import { ProductFilter } from './../dto/create-product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantsDto } from '../dto/create-product-variant.dto';
import slugify from 'slugify';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(ProductVariantService)
    private variantService: ProductVariantService,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    console.log(product);
    const created = await this.productRepository.save({
      ...prepareForCreate(product),
      slug: slugify(product.name),
    });
    // TODO cretae a defaultVariant
    // const defaultVariant = Object.assign(new CreateProductVariantsDto(), {
    //   sku: '0000',
    //   product,
    //   name: created.name,
    //   slug: created.slug,
    //   description: 'Default Variant for ' + product.description,
    //   is_pre_order: false,
    //   quantity_limit_per_customer: 1,
    //   weight: 0,
    // });
    // await this.variantService.create(prepareForCreate(defaultVariant));
    return await this.readById(created.id);
  }

  async readAll(
    options: IPaginationOptions,
    filters: ProductFilter,
  ): Promise<Pagination<Product>> {
    return await paginate<Product>(this.productRepository, options, {
      ...filters,
      relations: ['product_type', 'category'],
    } as any);
  }

  async readById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['product_type', 'category'],
    });
  }

  async update(id: string, product: UpdateProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(
      { id },
      prepareForUpdate(product),
    );
  }

  async delete(id): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
