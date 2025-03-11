import { Module } from '@nestjs/common';
import { OrderService } from './application/order.service';
import { OrderController } from './infraestructure/controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Order, OrderSchema } from './domain/entities/order.entity';
import { OrderRepository } from './infraestructure/persistence/order.repository';
import { SparePartModule } from '../spare_part/spare_part.module';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import { PdfRepository } from '../common/infraestructure/adapters/pdf-repository';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'IOrderRepository', // Usar token para inyección de dependencias
      useClass: OrderRepository,
    },
    PdfRepository,
  ],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
    SparePartModule,
    UserDetailModule,
    NotificationModule,
    FilesModule,
  ],
})
export class OrderModule {}
