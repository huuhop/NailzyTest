import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
    providers: [OrderService],
    exports: [OrderService, OrderModule],
  })
export class OrderModule {}
