import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { OrderSchema } from './order/order.schema';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sales-tax-db'),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    OrderModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
