import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/infraestructure/adapters/mongo_base_repository';
import { UserDetail } from '../../domain/entities/user-detail.entity';
import { IUserDetailRepository } from '../../domain/repository/user-detail.respository.interface';
import { ObjectId } from 'mongodb';
import { IUserDetail } from 'src/user-detail/domain/interfaces/user-detail.interface';

@Injectable()
export class UserDetailRepository
  extends BaseRepository<UserDetail, IUserDetail>
  implements IUserDetailRepository
{
  constructor(
    @InjectModel(UserDetail.name)
    private readonly _detailModel: Model<UserDetail>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: UserDetail): IUserDetail {
    return {
      _id: (entity._id as ObjectId).toString(),
      userID: entity.userID,
      firstName: entity.firstName,
      lastName: entity.lastName,
      phone: entity.phone,
      address: entity.address,
      postalCode: entity.postalCode,
      city: entity.city,
      province: entity.province,
      identityDocumentNumber: entity.identityDocumentNumber,
      identityDocumentType: entity.identityDocumentType,
    };
  }
}
