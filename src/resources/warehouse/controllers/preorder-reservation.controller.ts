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
import { PreOrderReservationService } from '../services/preorder-reservation.service';

@Controller('preorder-reservation')
export class PreOrderReservationController {
  constructor(
    private readonly preOrderReservationService: PreOrderReservationService,
  ) {}

  @Post()
  async createPreOrderReservation(
    @Res() response,
    @Body() preOrderReservation: CreateWarehouseDto,
  ) {
    const newPreOrderReservation = await this.preOrderReservationService.create(
      preOrderReservation,
    );
    return response.status(HttpStatus.CREATED).json({
      newPreOrderReservation,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const preOrderReservations =
      await this.preOrderReservationService.readAll();
    return response.status(HttpStatus.OK).json({
      preOrderReservations,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const preOrderReservation = await this.preOrderReservationService.readById(
      id,
    );
    return response.status(HttpStatus.OK).json({
      preOrderReservation,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() preOrderReservation: UpdateWarehouseDto,
  ) {
    const updatedPreOrderReservation =
      await this.preOrderReservationService.update(id, preOrderReservation);
    return response.status(HttpStatus.OK).json({
      updatedPreOrderReservation,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedPreOrderReservation =
      await this.preOrderReservationService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedPreOrderReservation,
    });
  }
}
