import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { UserDetail } from '../entities/user-detail.entity';
import { ResponseUserDetailDbDto } from '../dto/response-user-detail-response-db.dto';
import { IUserDetailRepository } from './user-detail.respository.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserDetailRepository
  extends BaseRepository<UserDetail, ResponseUserDetailDbDto>
  implements IUserDetailRepository
{
  constructor(
    @InjectModel(UserDetail.name)
    private readonly _detailModel: Model<UserDetail>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: UserDetail): ResponseUserDetailDbDto {
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
