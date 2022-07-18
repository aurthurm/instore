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
import { WareHouseService } from '../services/warehouse.service';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/warehouse')
@ApiTags('WareHouse')
export class WareHouseController {
  constructor(private readonly productService: WareHouseService) {}

  @Post()
  async createWareHouse(@Res() response, @Body() product: CreateWarehouseDto) {
    const newWareHouse = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newWareHouse,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.productService.readAll();
    return response.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productService.readById(id);
    return response.status(HttpStatus.OK).json({
      product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateWarehouseDto,
  ) {
    const updatedWareHouse = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedWareHouse,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedWareHouse = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedWareHouse,
    });
  }
}
