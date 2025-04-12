import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async create(stock: CreateWarehouseDto): Promise<Stock> {
    return this.stockRepository.save(prepareForCreate(stock));
  }

  async readAll(): Promise<Stock[]> {
    return await this.stockRepository.find();
  }

  async readById(id): Promise<Stock> {
    return await this.stockRepository.findOneBy({ id });
  }

  async update(id, stock: UpdateWarehouseDto): Promise<Stock> {
    await this.stockRepository.update(id, prepareForUpdate(stock));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.stockRepository.delete(id);
  }
}
