import { Injectable } from '@nestjs/common';
import { CreateCheckoutStockDto } from './dto/create-checkout-stock.dto';
import { UpdateCheckoutStockDto } from './dto/update-checkout-stock.dto';

@Injectable()
export class CheckoutStockService {
  create(createCheckoutStockDto: CreateCheckoutStockDto) {
    return 'This action adds a new checkoutStock';
  }

  findAll() {
    return `This action returns all checkoutStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkoutStock`;
  }

  update(id: number, updateCheckoutStockDto: UpdateCheckoutStockDto) {
    return `This action updates a #${id} checkoutStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkoutStock`;
  }
}
