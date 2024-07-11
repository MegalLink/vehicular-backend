import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { Order } from '../entities/order.entity';
import { ResponseOrderDbDto } from '../dto/response-order-db.dto';
import { IOrderRepository } from './order.respository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderRepository
  extends BaseRepository<Order, ResponseOrderDbDto>
  implements IOrderRepository
{
  constructor(
    @InjectModel(Order.name)
    private readonly _detailModel: Model<Order>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: Order): ResponseOrderDbDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      orderID: entity.orderID,
      userID: entity.userID,
      userDetail: entity.userDetail,
      paymentStatus: entity.paymentStatus,
      status: entity.status,
      totalPrice: entity.totalPrice,
      items: entity.items,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
