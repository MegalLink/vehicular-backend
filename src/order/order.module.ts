import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderRepository } from './repository/order.repository';
import { SparePartModule } from '../spare_part/spare_part.module';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
    SparePartModule,
    UserDetailModule,
  ],
})
export class OrderModule {}
