import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutStockController } from './checkout-stock.controller';
import { CheckoutStockService } from './checkout-stock.service';

describe('CheckoutStockController', () => {
  let controller: CheckoutStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutStockController],
      providers: [CheckoutStockService],
    }).compile();

    controller = module.get<CheckoutStockController>(CheckoutStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
