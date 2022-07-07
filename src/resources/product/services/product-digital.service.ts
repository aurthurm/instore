import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductDigital,
  ProductDigitalDocument,
} from '../entities/product-digital.entity';

@Injectable()
export class ProductDigitalDigitalService {
  constructor(
    @InjectModel(ProductDigital.name)
    private productModel: Model<ProductDigitalDocument>,
  ) {}

  async create(productDigital: CreateProductDto): Promise<ProductDigital> {
    const newProductDigital = new this.productModel(productDigital);
    return newProductDigital.save();
  }

  async readAll(): Promise<ProductDigital[]> {
    return await this.productModel.find().exec();
  }

  async readById(id): Promise<ProductDigital> {
    return await this.productModel.findById(id).exec();
  }

  async update(id, productDigital: UpdateProductDto): Promise<ProductDigital> {
    return await this.productModel.findByIdAndUpdate(id, productDigital, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
