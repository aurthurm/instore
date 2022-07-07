import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductCollection,
  ProductCollectionDocument,
} from '../entities/product-collection.entity';

@Injectable()
export class ProductCollectionCollectionService {
  constructor(
    @InjectModel(ProductCollection.name)
    private productModel: Model<ProductCollectionDocument>,
  ) {}

  async create(
    productCollection: CreateProductDto,
  ): Promise<ProductCollection> {
    const newProductCollection = new this.productModel(productCollection);
    return newProductCollection.save();
  }

  async readAll(): Promise<ProductCollection[]> {
    return await this.productModel.find().exec();
  }

  async readById(id): Promise<ProductCollection> {
    return await this.productModel.findById(id).exec();
  }

  async update(
    id,
    productCollection: UpdateProductDto,
  ): Promise<ProductCollection> {
    return await this.productModel.findByIdAndUpdate(id, productCollection, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
