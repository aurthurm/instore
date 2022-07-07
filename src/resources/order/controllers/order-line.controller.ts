import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderLineService } from '../services/order-line.service';

@Controller('order-line')
export class OrderLineController {
  constructor(private readonly productService: OrderLineService) {}

  @Post()
  async createOrderLine(@Res() response, @Body() product: CreateOrderDto) {
    const newOrderLine = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newOrderLine,
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
    const updatedOrderLine = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedOrderLine,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedOrderLine = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedOrderLine,
    });
  }
}
