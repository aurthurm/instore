import { Test, TestingModule } from '@nestjs/testing';
import { WareHouseController } from '../controllers/warehouse.controller';
import { WareHouseService } from '../services/warehouse.service';

describe('WareHouseController', () => {
  let controller: WareHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WareHouseController],
      providers: [WareHouseService],
    }).compile();

    controller = module.get<WareHouseController>(WareHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
