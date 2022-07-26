import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { PreOrderReservation } from '../entities/preorder-reservation.entity';

@Injectable()
export class PreOrderReservationService {
  constructor(
    @InjectRepository(PreOrderReservation)
    private preOrderReservationRepository: Repository<PreOrderReservation>,
  ) {}

  async create(
    preOrderReservation: CreateWarehouseDto,
  ): Promise<PreOrderReservation> {
    return await this.preOrderReservationRepository.save(
      prepareForCreate(preOrderReservation),
    );
  }

  async readAll(): Promise<PreOrderReservation[]> {
    return await this.preOrderReservationRepository.find();
  }

  async readById(id): Promise<PreOrderReservation> {
    return await this.preOrderReservationRepository.findOneBy({ id });
  }

  async update(
    id,
    preOrderReservation: UpdateWarehouseDto,
  ): Promise<PreOrderReservation> {
    await this.preOrderReservationRepository.update(
      id,
      prepareForUpdate(preOrderReservation),
    );
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.preOrderReservationRepository.delete(id);
  }
}
