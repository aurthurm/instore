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
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderFullfilmentLineService } from '../services/order-fullfilment-line.service';

@Controller('api/order-fullfilment-line')
@ApiTags('Order FUllfilment LIne')
export class OrderFullfilmentLineController {
  constructor(private readonly productService: OrderFullfilmentLineService) {}

  @Post()
  async createOrderFullfilmentLine(
    @Res() response,
    @Body() product: CreateOrderDto,
  ) {
    const newOrderFullfilmentLine = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newOrderFullfilmentLine,
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
    @Body() product: UpdateOrderDto,
  ) {
    const updatedOrderFullfilmentLine = await this.productService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      updatedOrderFullfilmentLine,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedOrderFullfilmentLine = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedOrderFullfilmentLine,
    });
  }
}
