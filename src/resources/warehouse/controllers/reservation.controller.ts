import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { ReservationService } from '../services/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(
    @Res() response,
    @Body() reservation: CreateWarehouseDto,
  ) {
    const newReservation = await this.reservationService.create(reservation);
    return response.status(HttpStatus.CREATED).json({
      newReservation,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const reservations = await this.reservationService.readAll();
    return response.status(HttpStatus.OK).json({
      reservations,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const reservation = await this.reservationService.readById(id);
    return response.status(HttpStatus.OK).json({
      reservation,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() reservation: UpdateWarehouseDto,
  ) {
    const updatedReservation = await this.reservationService.update(
      id,
      reservation,
    );
    return response.status(HttpStatus.OK).json({
      updatedReservation,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedReservation = await this.reservationService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedReservation,
    });
  }
}
