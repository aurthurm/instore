import { Test, TestingModule } from '@nestjs/testing';
import { OrderStockService } from './order-stock.service';

describe('OrderStockService', () => {
  let service: OrderStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStockService],
    }).compile();

    service = module.get<OrderStockService>(OrderStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
