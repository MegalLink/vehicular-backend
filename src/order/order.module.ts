import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderRepository } from './repository/order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
  ],
})
export class OrderModule {}
