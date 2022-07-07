import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutStockService } from './checkout-stock.service';

describe('CheckoutStockService', () => {
  let service: CheckoutStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutStockService],
    }).compile();

    service = module.get<CheckoutStockService>(CheckoutStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
