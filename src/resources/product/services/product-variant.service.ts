import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  ProductVariant,
  ProductVariantDocument,
} from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectModel(ProductVariant.name)
    private productVariantModel: Model<ProductVariantDocument>,
  ) {}

  async create(productVariant: CreateProductDto): Promise<ProductVariant> {
    const newVariant = new this.productVariantModel(productVariant);
    return newVariant.save();
  }

  async readAll(): Promise<ProductVariant[]> {
    return await this.productVariantModel.find().exec();
  }

  async readById(id): Promise<ProductVariant> {
    return await this.productVariantModel.findById(id).exec();
  }

  async update(id, productVariant: UpdateProductDto): Promise<ProductVariant> {
    return await this.productVariantModel.findByIdAndUpdate(
      id,
      productVariant,
      {
        new: true,
      },
    );
  }

  async delete(id): Promise<any> {
    return await this.productVariantModel.findByIdAndRemove(id);
  }
}
