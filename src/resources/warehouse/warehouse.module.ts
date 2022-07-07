import { Module } from '@nestjs/common';
import { WareHouseService } from './services/warehouse.service';
import { WareHouseController } from './controllers/warehouse.controller';

@Module({
  controllers: [WareHouseController],
  providers: [WareHouseService],
})
export class WarehouseModule {}
