import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WareHouse, WareHouseDocument } from '../entities/warehouse.entity';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectModel(WareHouse.name)
    private wareHouseModel: Model<WareHouseDocument>,
  ) {}

  async create(wareHouse: CreateWarehouseDto): Promise<WareHouse> {
    const newWareHouse = new this.wareHouseModel(wareHouse);
    return newWareHouse.save();
  }

  async readAll(): Promise<WareHouse[]> {
    return await this.wareHouseModel.find().exec();
  }

  async readById(id): Promise<WareHouse> {
    return await this.wareHouseModel.findById(id).exec();
  }

  async update(id, wareHouse: UpdateWarehouseDto): Promise<WareHouse> {
    return await this.wareHouseModel.findByIdAndUpdate(id, wareHouse, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.wareHouseModel.findByIdAndRemove(id);
  }
}
