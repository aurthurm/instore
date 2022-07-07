import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import {
  PreOrderReservation,
  PreOrderReservationDocument,
} from '../entities/preorder-reservation.entity';

@Injectable()
export class PreOrderReservationService {
  constructor(
    @InjectModel(PreOrderReservation.name)
    private preOrderReservationModel: Model<PreOrderReservationDocument>,
  ) {}

  async create(
    preOrderReservation: CreateWarehouseDto,
  ): Promise<PreOrderReservation> {
    const newPreOrderReservation = new this.preOrderReservationModel(
      preOrderReservation,
    );
    return newPreOrderReservation.save();
  }

  async readAll(): Promise<PreOrderReservation[]> {
    return await this.preOrderReservationModel.find().exec();
  }

  async readById(id): Promise<PreOrderReservation> {
    return await this.preOrderReservationModel.findById(id).exec();
  }

  async update(
    id,
    preOrderReservation: UpdateWarehouseDto,
  ): Promise<PreOrderReservation> {
    return await this.preOrderReservationModel.findByIdAndUpdate(
      id,
      preOrderReservation,
      {
        new: true,
      },
    );
  }

  async delete(id): Promise<any> {
    return await this.preOrderReservationModel.findByIdAndRemove(id);
  }
}
