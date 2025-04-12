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
import { ApiTags } from '@nestjs/swagger';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { AllocationService } from '../services/allocation.service';

@Controller('api/allocation')
@ApiTags('Allocation')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  async createAllocation(
    @Res() response,
    @Body() allocation: CreateWarehouseDto,
  ) {
    const newAllocation = await this.allocationService.create(allocation);
    return response.status(HttpStatus.CREATED).json({
      newAllocation,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const allocations = await this.allocationService.readAll();
    return response.status(HttpStatus.OK).json({
      allocations,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const allocation = await this.allocationService.readById(id);
    return response.status(HttpStatus.OK).json({
      allocation,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() allocation: UpdateWarehouseDto,
  ) {
    const updatedAllocation = await this.allocationService.update(
      id,
      allocation,
    );
    return response.status(HttpStatus.OK).json({
      updatedAllocation,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedAllocation = await this.allocationService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedAllocation,
    });
  }
}
