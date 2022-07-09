import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WAREHOUSE_CONTROLLERS } from './controllers';
import { WAREHOUSE_SERVICES } from './services';
import { WAREHOUSE_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([...WAREHOUSE_ENTITIES])],
  controllers: [...WAREHOUSE_CONTROLLERS],
  providers: [...WAREHOUSE_SERVICES],
})
export class WarehouseModule {}
