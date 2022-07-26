import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { WareHouseService } from '../services/warehouse.service';
import {
  CreateWarehouseDto,
  WareHouseFilter,
} from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/warehouse')
@ApiTags('WareHouse')
export class WareHouseController {
  constructor(private readonly wareHouseService: WareHouseService) {}

  @Post()
  async createWareHouse(@Res() response, @Body() product: CreateWarehouseDto) {
    const newWareHouse = await this.wareHouseService.create(product);
    return response.status(HttpStatus.CREATED).json({
      item: newWareHouse,
    });
  }

  @Get()
  async fetchAll(
    @Query() filters: WareHouseFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() response,
    @Request() request,
  ) {
    limit = limit > 100 ? 100 : limit;
    const pagination = await this.wareHouseService.readAll(
      {
        page,
        limit,
        route: request?.headers?.hostname,
      },
      filters,
    );
    return response.status(HttpStatus.OK).json(pagination);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.wareHouseService.readById(id);
    return response.status(HttpStatus.OK).json({
      item: product,
    });
  }

  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() product: UpdateWarehouseDto,
  ) {
    const updatedWareHouse = await this.wareHouseService.update(id, product);
    return response.status(HttpStatus.OK).json({
      item: updatedWareHouse,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedWareHouse = await this.wareHouseService.delete(id);
    return response.status(HttpStatus.OK).json({
      item: deletedWareHouse,
    });
  }
}
