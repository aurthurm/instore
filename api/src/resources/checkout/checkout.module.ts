import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CHECKOUT_SERVICES } from './services';
import { CHECKOUT_ENTITIES } from './entities';
import { CHECKOUT_CONTROLLERS } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([...CHECKOUT_ENTITIES])],
  controllers: [...CHECKOUT_CONTROLLERS],
  providers: [...CHECKOUT_SERVICES],
})
export class CheckoutModule {}
