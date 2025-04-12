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
import { StockService } from '../services/stock.service';

@Controller('api/stock')
@ApiTags('Stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async createStock(@Res() response, @Body() stock: CreateWarehouseDto) {
    const newStock = await this.stockService.create(stock);
    return response.status(HttpStatus.CREATED).json({
      newStock,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const stocks = await this.stockService.readAll();
    return response.status(HttpStatus.OK).json({
      stocks,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const stock = await this.stockService.readById(id);
    return response.status(HttpStatus.OK).json({
      stock,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() stock: UpdateWarehouseDto,
  ) {
    const updatedStock = await this.stockService.update(id, stock);
    return response.status(HttpStatus.OK).json({
      updatedStock,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedStock = await this.stockService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedStock,
    });
  }
}
