import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareForCreate, prepareForUpdate } from 'src/helpers/entity.helpers';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(reservation: CreateWarehouseDto): Promise<Reservation> {
    return await this.reservationRepository.save(prepareForCreate(reservation));
  }

  async readAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async readById(id): Promise<Reservation> {
    return await this.reservationRepository.findOneBy(id);
  }

  async update(id, reservation: UpdateWarehouseDto): Promise<Reservation> {
    await this.reservationRepository.update(id, prepareForUpdate(reservation));
    return await this.readById(id);
  }

  async delete(id): Promise<any> {
    return await this.reservationRepository.delete(id);
  }
}
