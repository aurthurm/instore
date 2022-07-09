import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { PreOrderAllocation } from '../entities/preorder-allocation.entity';

@Injectable()
export class PreOrderAllocationService {
  constructor(
    @InjectRepository(PreOrderAllocation)
    private allocationRepository: Repository<PreOrderAllocation>,
  ) {}

  async create(allocation: CreateWarehouseDto): Promise<PreOrderAllocation> {
    return await this.allocationRepository.save(prepareForCreate(allocation));
  }

  async readAll(): Promise<PreOrderAllocation[]> {
    return await this.allocationRepository.find();
  }

  async readById(id): Promise<PreOrderAllocation> {
    return await this.allocationRepository.findOneBy(id);
  }

  async update(
    id,
    allocation: UpdateWarehouseDto,
  ): Promise<PreOrderAllocation> {
    await this.allocationRepository.update(id, prepareForUpdate(allocation));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.allocationRepository.remove(id);
  }
}
