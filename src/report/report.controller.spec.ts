import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { OrderService } from 'src/order/order.service';

describe('ReportController', () => {
  let controller: ReportController;
  let reportService: ReportService;

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
      controllers: [ReportController],
      providers: [
        ReportService,
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<ReportController>(ReportController);
    reportService = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the correct sales tax report', async () => {
    const result = await controller.getSalesTaxReport();
    expect(result).toEqual(mockTaxData);
    expect(mockOrderService.aggregateSalesTax).toHaveBeenCalled();
  });
});