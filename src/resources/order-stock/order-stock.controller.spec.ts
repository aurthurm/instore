import { Test, TestingModule } from '@nestjs/testing';
import { OrderStockController } from './order-stock.controller';
import { OrderStockService } from './order-stock.service';

describe('OrderStockController', () => {
  let controller: OrderStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStockController],
      providers: [OrderStockService],
    }).compile();

    controller = module.get<OrderStockController>(OrderStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
