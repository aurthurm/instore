import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORDER_CONTROLLERS } from './controllers';
import { ORDER_SERVICES } from './services';
import { ORDER_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([...ORDER_ENTITIES])],
  controllers: [...ORDER_CONTROLLERS],
  providers: [...ORDER_SERVICES],
})
export class OrderModule {}
