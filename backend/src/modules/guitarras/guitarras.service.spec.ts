import { Test, TestingModule } from '@nestjs/testing';
import { GuitarrasService } from './guitarras.service';

describe('GuitarrasService', () => {
  let service: GuitarrasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuitarrasService],
    }).compile();

    service = module.get<GuitarrasService>(GuitarrasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
