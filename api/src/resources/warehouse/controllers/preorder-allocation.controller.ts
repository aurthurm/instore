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
import { PreOrderAllocationService } from '../services/preorder-allocation.service';

@Controller('api/preorder-allocation')
@ApiTags('PreOrdr Allocation')
export class PreOrderAllocationController {
  constructor(
    private readonly preOrderAllocationService: PreOrderAllocationService,
  ) {}

  @Post()
  async createPreOrderAllocation(
    @Res() response,
    @Body() preOrderAllocation: CreateWarehouseDto,
  ) {
    const newPreOrderAllocation = await this.preOrderAllocationService.create(
      preOrderAllocation,
    );
    return response.status(HttpStatus.CREATED).json({
      newPreOrderAllocation,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const preOrderAllocations = await this.preOrderAllocationService.readAll();
    return response.status(HttpStatus.OK).json({
      preOrderAllocations,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const preOrderAllocation = await this.preOrderAllocationService.readById(
      id,
    );
    return response.status(HttpStatus.OK).json({
      preOrderAllocation,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() preOrderAllocation: UpdateWarehouseDto,
  ) {
    const updatedPreOrderAllocation =
      await this.preOrderAllocationService.update(id, preOrderAllocation);
    return response.status(HttpStatus.OK).json({
      updatedPreOrderAllocation,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedPreOrderAllocation =
      await this.preOrderAllocationService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedPreOrderAllocation,
    });
  }
}
