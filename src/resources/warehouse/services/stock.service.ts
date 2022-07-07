import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { Stock, StockDocument } from '../entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private stockModel: Model<StockDocument>,
  ) {}

  async create(stock: CreateWarehouseDto): Promise<Stock> {
    const newStock = new this.stockModel(stock);
    return newStock.save();
  }

  async readAll(): Promise<Stock[]> {
    return await this.stockModel.find().exec();
  }

  async readById(id): Promise<Stock> {
    return await this.stockModel.findById(id).exec();
  }

  async update(id, stock: UpdateWarehouseDto): Promise<Stock> {
    return await this.stockModel.findByIdAndUpdate(id, stock, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.stockModel.findByIdAndRemove(id);
  }
}
