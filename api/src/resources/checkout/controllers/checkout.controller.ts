import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckOutService } from '../services/checkout.service';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';
import { UpdateCheckoutDto } from '../dto/update-checkout.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/checkout')
@ApiTags('Checkout')
export class CheckOutController {
  constructor(private readonly checkoutService: CheckOutService) {}

  @Post()
  create(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutService.create(createCheckoutDto);
  }

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto,
  ) {
    return this.checkoutService.update(+id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }
}
