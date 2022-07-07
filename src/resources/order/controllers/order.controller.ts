import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly productService: OrderService) {}

  @Post()
  async createOrder(@Res() response, @Body() product: CreateOrderDto) {
    const newOrder = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newOrder,
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
    const updatedOrder = await this.productService.update(id, product);
    return response.status(HttpStatus.OK).json({
      updatedOrder,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedOrder = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedOrder,
    });
  }
}
