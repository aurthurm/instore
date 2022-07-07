import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import {
  Reservation,
  ReservationDocument,
} from '../entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(reservation: CreateWarehouseDto): Promise<Reservation> {
    const newReservation = new this.reservationModel(reservation);
    return newReservation.save();
  }

  async readAll(): Promise<Reservation[]> {
    return await this.reservationModel.find().exec();
  }

  async readById(id): Promise<Reservation> {
    return await this.reservationModel.findById(id).exec();
  }

  async update(id, reservation: UpdateWarehouseDto): Promise<Reservation> {
    return await this.reservationModel.findByIdAndUpdate(id, reservation, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.reservationModel.findByIdAndRemove(id);
  }
}
