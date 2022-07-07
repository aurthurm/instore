import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../entities/product-category.entity';

@Injectable()
export class ProductCategoryCategoryService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productModel: Model<ProductCategoryDocument>,
  ) {}

  async create(productCategory: CreateProductDto): Promise<ProductCategory> {
    const newProductCategory = new this.productModel(productCategory);
    return newProductCategory.save();
  }

  async readAll(): Promise<ProductCategory[]> {
    return await this.productModel.find().exec();
  }

  async readById(id): Promise<ProductCategory> {
    return await this.productModel.findById(id).exec();
  }

  async update(
    id,
    productCategory: UpdateProductDto,
  ): Promise<ProductCategory> {
    return await this.productModel.findByIdAndUpdate(id, productCategory, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
