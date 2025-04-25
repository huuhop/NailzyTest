import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { OrderService } from '../order/order.service';

describe('ReportService', () => {
  let service: ReportService;

  const mockTaxData = [
    {
      amount_to_collect: 5.36,
      city: 'ROCKWALL',
      country: 'US',
      county: 'DALLAS',
      state: 'TX',
      rate: 0.0725,
    }
  ];

  const mockOrderService = {
    aggregateSalesTax: jest.fn().mockResolvedValue(mockTaxData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the tax data from OrderService', async () => {
    const result = await service.getSalesTaxReport();
    expect(result).toEqual(mockTaxData);
    expect(mockOrderService.aggregateSalesTax).toHaveBeenCalled();
  });
});