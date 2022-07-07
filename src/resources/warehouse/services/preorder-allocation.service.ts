import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import {
  PreOrderAllocation,
  PreOrderAllocationDocument,
} from '../entities/preorder-allocation.entity';

@Injectable()
export class PreOrderAllocationService {
  constructor(
    @InjectModel(PreOrderAllocation.name)
    private allocationModel: Model<PreOrderAllocationDocument>,
  ) {}

  async create(allocation: CreateWarehouseDto): Promise<PreOrderAllocation> {
    const newPreOrderAllocation = new this.allocationModel(allocation);
    return newPreOrderAllocation.save();
  }

  async readAll(): Promise<PreOrderAllocation[]> {
    return await this.allocationModel.find().exec();
  }

  async readById(id): Promise<PreOrderAllocation> {
    return await this.allocationModel.findById(id).exec();
  }

  async update(
    id,
    allocation: UpdateWarehouseDto,
  ): Promise<PreOrderAllocation> {
    return await this.allocationModel.findByIdAndUpdate(id, allocation, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.allocationModel.findByIdAndRemove(id);
  }
}
