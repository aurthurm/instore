import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { WarehouseModule } from './warehouse/warehouse.module';

const RESOURCE_MODULES = [
  ProductModule,
  UserModule,
  CheckoutModule,
  OrderModule,
  AuthModule,
  WarehouseModule,
];

export {
  ProductModule,
  UserModule,
  CheckoutModule,
  OrderModule,
  AuthModule,
  WarehouseModule,
  RESOURCE_MODULES,
};
