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
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderFullfilmentService } from '../services/order-fullfilment.service';

@Controller('order-fulfillment')
export class OrderFullfilmentController {
  constructor(private readonly productService: OrderFullfilmentService) {}

  @Post()
  async createOrderFullfillment(
    @Res() response,
    @Body() product: CreateOrderDto,
  ) {
    const newOrderFullfillment = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newOrderFullfillment,
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
    const updatedOrderFullfillment = await this.productService.update(
      id,
      product,
    );
    return response.status(HttpStatus.OK).json({
      updatedOrderFullfillment,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedOrderFullfillment = await this.productService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedOrderFullfillment,
    });
  }
}
