import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  const mockTaxData = [
    {
      city: 'ROCKWALL',
      country: 'US',
      county: 'DALLAS',
      state: 'TX',
      rate: 0.06,
      amount_to_collect: 1.23,
    },
  ];

  const mockReportService = {
    getSalesTaxReport: jest.fn().mockResolvedValue(mockTaxData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: mockReportService,
        },
      ],
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });
  
  it('should return the correct tax report from controller', async () => {
    const result = await controller.getSalesTaxReport();
    expect(result).toEqual(mockTaxData);
    expect(mockReportService.getSalesTaxReport).toHaveBeenCalled();
  });
});