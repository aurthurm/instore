import { ProductVariantStock } from './../../product/entities/product-variant-stock.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsBoolean } from 'class-validator';
import { CheckOut } from 'src/resources/checkout/entities';
import { OrderFullfilmentLine } from 'src/resources/order/entities/order-fullfilment-line.entity';
import { Stock } from '../entities';

export class CreateWarehouseDto implements Readonly<CreateWarehouseDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  is_private: boolean;

  @ApiProperty()
  fullfilment_lines: OrderFullfilmentLine[];

  @ApiProperty()
  variant_stocks: ProductVariantStock[];

  @ApiProperty()
  stocks: Stock[];

  @ApiProperty()
  checkouts: CheckOut[];
}

export class WareHouseFilter {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_private: boolean;
}
