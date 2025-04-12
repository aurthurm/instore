import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRODUCT_CONTROLLERS } from './controllers';
import { PRODUCT_ENTITIES } from './entities';
import { PRODUCT_SERVICES } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([...PRODUCT_ENTITIES])],
  controllers: [...PRODUCT_CONTROLLERS],
  providers: [...PRODUCT_SERVICES],
})
export class ProductModule {}
