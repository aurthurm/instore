import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckoutStockService } from './checkout-stock.service';
import { CreateCheckoutStockDto } from './dto/create-checkout-stock.dto';
import { UpdateCheckoutStockDto } from './dto/update-checkout-stock.dto';

@Controller('checkout-stock')
export class CheckoutStockController {
  constructor(private readonly checkoutStockService: CheckoutStockService) {}

  @Post()
  create(@Body() createCheckoutStockDto: CreateCheckoutStockDto) {
    return this.checkoutStockService.create(createCheckoutStockDto);
  }

  @Get()
  findAll() {
    return this.checkoutStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckoutStockDto: UpdateCheckoutStockDto) {
    return this.checkoutStockService.update(+id, updateCheckoutStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutStockService.remove(+id);
  }
}
