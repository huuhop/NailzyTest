import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ReportService {
  constructor(private readonly orderService: OrderService) {}

  async getSalesTaxReport() {
    return this.orderService.aggregateSalesTax();
  }
}