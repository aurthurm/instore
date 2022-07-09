import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { Allocation } from '../entities/allocation.entity';

@Injectable()
export class AllocationService {
  constructor(
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
  ) {}

  async create(allocation: CreateWarehouseDto): Promise<Allocation> {
    return await this.allocationRepository.save(prepareForCreate(allocation));
  }

  async readAll(): Promise<Allocation[]> {
    return await this.allocationRepository.find();
  }

  async readById(id): Promise<Allocation> {
    return await this.allocationRepository.findOneBy({ id });
  }

  async update(id, allocation: UpdateWarehouseDto): Promise<Allocation> {
    await this.allocationRepository.update(id, prepareForUpdate(allocation));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.allocationRepository.remove(id);
  }
}
