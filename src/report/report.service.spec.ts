import { ReportService } from './report.service';

describe('ReportService', () => {
  let reportService: ReportService;
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

  const mockOrderService = {
    aggregateSalesTax: jest.fn().mockResolvedValue(mockTaxData),
  };

  beforeEach(() => {
    reportService = new ReportService(mockOrderService as any);
  });

  it('should return tax report from orderService', async () => {
    const result = await reportService.getSalesTaxReport();
    expect(result).toEqual(mockTaxData);
    expect(mockOrderService.aggregateSalesTax).toHaveBeenCalled();
  });
});