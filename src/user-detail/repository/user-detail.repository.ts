import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { UserDetail } from '../entities/user-detail.entity';
import { ResponseUserDetailDbDto } from '../dto/response-user-detail-response-db.dto';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';

export interface IUserDetailRepository {
  create(entity: UserDetail): Promise<ResponseUserDetailDbDto>;
  findAll(): Promise<ResponseUserDetailDbDto[]>;
  findOne(query: object): Promise<ResponseUserDetailDbDto | undefined>;
  update(
    searchParam: string,
    updateDto: UpdateUserDetailDto,
  ): Promise<ResponseUserDetailDbDto>;
  remove(searchParam: string): Promise<ResponseUserDetailDbDto>;
}

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
      _id: entity._id as string,
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
