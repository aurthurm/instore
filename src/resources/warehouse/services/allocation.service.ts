import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { Allocation, AllocationDocument } from '../entities/allocation.entity';

@Injectable()
export class AllocationService {
  constructor(
    @InjectModel(Allocation.name)
    private allocationModel: Model<AllocationDocument>,
  ) {}

  async create(allocation: CreateWarehouseDto): Promise<Allocation> {
    const newAllocation = new this.allocationModel(allocation);
    return newAllocation.save();
  }

  async readAll(): Promise<Allocation[]> {
    return await this.allocationModel.find().exec();
  }

  async readById(id): Promise<Allocation> {
    return await this.allocationModel.findById(id).exec();
  }

  async update(id, allocation: UpdateWarehouseDto): Promise<Allocation> {
    return await this.allocationModel.findByIdAndUpdate(id, allocation, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.allocationModel.findByIdAndRemove(id);
  }
}
