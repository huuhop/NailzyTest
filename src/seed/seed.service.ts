import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectModel('Order') private readonly orderModel: Model<any>) {}

  async onModuleInit() {
    console.log('------------onModuleInit------------')
    const dataPath = path.join(__dirname, '../../sample_orders.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const orders = JSON.parse(jsonData);

    await this.orderModel.deleteMany({});
    await this.orderModel.insertMany(orders);
    console.log('Seeded orders into MongoDB');
  }
}