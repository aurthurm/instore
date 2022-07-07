import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductType,
  ProductTypeDocument,
} from '../entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private productTypeModel: Model<ProductTypeDocument>,
  ) {}

  async create(productType: CreateProductDto): Promise<ProductType> {
    const newProductType = new this.productTypeModel(productType);
    return newProductType.save();
  }

  async readAll(): Promise<ProductType[]> {
    return await this.productTypeModel.find().exec();
  }

  async readById(id): Promise<ProductType> {
    return await this.productTypeModel.findById(id).exec();
  }

  async update(id, productType: UpdateProductDto): Promise<ProductType> {
    return await this.productTypeModel.findByIdAndUpdate(id, productType, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productTypeModel.findByIdAndRemove(id);
  }
}
