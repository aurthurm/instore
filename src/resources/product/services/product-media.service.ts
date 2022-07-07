import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductMedia,
  ProductMediaDocument,
} from '../entities/product-media.entity';

@Injectable()
export class ProductMediaMediaService {
  constructor(
    @InjectModel(ProductMedia.name)
    private productModel: Model<ProductMediaDocument>,
  ) {}

  async create(productMedia: CreateProductDto): Promise<ProductMedia> {
    const newProductMedia = new this.productModel(productMedia);
    return newProductMedia.save();
  }

  async readAll(): Promise<ProductMedia[]> {
    return await this.productModel.find().exec();
  }

  async readById(id): Promise<ProductMedia> {
    return await this.productModel.findById(id).exec();
  }

  async update(id, productMedia: UpdateProductDto): Promise<ProductMedia> {
    return await this.productModel.findByIdAndUpdate(id, productMedia, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
