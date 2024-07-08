import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { UserDetail } from '../entities/user-detail.entity';
import { ResponseUserDetailDbDto } from '../dto/response-user-detail-response-db.dto';

@Injectable()
export class UserDetailRepository extends BaseRepository<
  UserDetail,
  ResponseUserDetailDbDto
> {
  constructor(
    @InjectModel(UserDetail.name)
    private readonly _detailModel: Model<UserDetail>,
  ) {
    super(_detailModel, 'Detalles de Usuario');
  }

  transform(entity: UserDetail): ResponseUserDetailDbDto {
    return {
      _id: entity._id as string,
      fullName: entity.fullName,
      identityDocumentNumber: entity.identityDocumentNumber,
      identityDocumentType: entity.identityDocumentType,
      address: entity.address,
      email: entity.email,
      postCode: entity.postCode,
      city: entity.city,
      country: entity.country,
      phone: entity.phone,
      userID: entity.userID,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
