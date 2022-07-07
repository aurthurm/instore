import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckoutStockDto } from './create-checkout-stock.dto';

export class UpdateCheckoutStockDto extends PartialType(CreateCheckoutStockDto) {}
