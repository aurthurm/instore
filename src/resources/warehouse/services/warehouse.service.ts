import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WareHouse } from '../entities/warehouse.entity';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectRepository(WareHouse)
    private wareHouseRepository: Repository<WareHouse>,
  ) {}

  async create(wareHouse: CreateWarehouseDto): Promise<WareHouse> {
    return await this.wareHouseRepository.save(prepareForCreate(wareHouse));
  }

  async readAll(): Promise<WareHouse[]> {
    return await this.wareHouseRepository.find();
  }

  async readById(id): Promise<WareHouse> {
    return await this.wareHouseRepository.findOneBy(id);
  }

  async update(id, wareHouse: UpdateWarehouseDto): Promise<WareHouse> {
    await this.wareHouseRepository.update(id, prepareForUpdate(wareHouse));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.wareHouseRepository.remove(id);
  }
}
