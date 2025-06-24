import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/infraestructure/adapters/mongo_base_repository';
import { Order } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../domain/repository/order.respository.interface';
import { IOrder } from 'src/order/domain/interfaces/order.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderRepository
  extends BaseRepository<Order, IOrder>
  implements IOrderRepository
{
  constructor(
    @InjectModel(Order.name)
    private readonly _detailModel: Model<Order>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: Order): IOrder {
    return {
      _id: (entity._id as ObjectId).toString(),
      orderID: entity.orderID,
      userID: entity.userID,
      userDetail: entity.userDetail,
      paymentStatus: entity.paymentStatus,
      paymentID: entity.paymentID,
      totalPrice: entity.totalPrice,
      items: entity.items,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
