import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { Cart } from '../entities/cart.entity';
import { ResponseCartDbDto } from '../dto/response-cart-db.dto';
import { ICartRepository } from './cart.respository.interface';

@Injectable()
export class CartRepository
  extends BaseRepository<Cart, ResponseCartDbDto>
  implements ICartRepository
{
  constructor(
    @InjectModel(Cart.name)
    private readonly _detailModel: Model<Cart>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: Cart): ResponseCartDbDto {
    return {
      _id: entity._id as string,
      userID: entity.userID,
      userDetailID: entity.userDetailID,
      totalPrice: entity.totalPrice,
      items: entity.items,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
