import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStockDto } from './create-order-stock.dto';

export class UpdateOrderStockDto extends PartialType(CreateOrderStockDto) {}
