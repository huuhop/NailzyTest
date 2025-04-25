import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<any>) {}

  async findAll() {
    return this.orderModel.find().exec();
  }

  async aggregateSalesTax() {
    return this.orderModel.aggregate([
      {
        $match: {
          'pricing.tax_information.amount_to_collect': { $gt: 0 },
        },
      },
      {
        $group: {
          _id: {
            city: '$pricing.tax_information.jurisdictions.city',
            country: '$pricing.tax_information.jurisdictions.country',
            county: '$pricing.tax_information.jurisdictions.county',
            state: '$pricing.tax_information.jurisdictions.state',
            rate: '$pricing.tax_information.rate',
          },
          amount_to_collect: { $sum: '$pricing.tax_information.amount_to_collect' },
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id.city',
          country: '$_id.country',
          county: '$_id.county',
          state: '$_id.state',
          rate: '$_id.rate',
          amount_to_collect: 1,
        },
      },
    ]);
  }
}