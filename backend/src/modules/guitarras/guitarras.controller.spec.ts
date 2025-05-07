import { Test, TestingModule } from '@nestjs/testing';
import { GuitarrasController } from './guitarras.controller';
import { GuitarrasService } from './guitarras.service';

describe('GuitarrasController', () => {
  let controller: GuitarrasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuitarrasController],
      providers: [GuitarrasService],
    }).compile();

    controller = module.get<GuitarrasController>(GuitarrasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
