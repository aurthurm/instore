import { WareHouseFilter } from './../dto/create-warehouse.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WareHouse } from '../entities/warehouse.entity';
import slugify from 'slugify';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectRepository(WareHouse)
    private wareHouseRepository: Repository<WareHouse>,
  ) {}

  async create(wareHouse: CreateWarehouseDto): Promise<WareHouse> {
    return await this.wareHouseRepository.save({
      ...prepareForCreate(wareHouse),
      slug: slugify(wareHouse.name),
    });
  }

  async readAll(
    options: IPaginationOptions,
    filters: WareHouseFilter,
  ): Promise<Pagination<WareHouse>> {
    return await paginate<WareHouse>(
      this.wareHouseRepository,
      options,
      filters,
    );
  }

  async readById(id: string): Promise<WareHouse> {
    console.log('reading');
    return await this.wareHouseRepository.findOneBy({ id });
  }

  async update(id, wareHouse: UpdateWarehouseDto): Promise<WareHouse> {
    await this.wareHouseRepository.update(id, prepareForUpdate(wareHouse));
    console.log('udateed');
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.wareHouseRepository.delete(id);
  }
}
