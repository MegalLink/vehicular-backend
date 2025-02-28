import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../../domain/entities/users.entity';
import { IUserRepository } from '../../domain/repository/auth.repository.interface';
import { ObjectId } from 'mongodb';
import { BaseRepository } from '../../../common/infraestructure/adapters/mongo_base_repository';
import { ResponseUserDbDto } from '../../application/dto/response-user-db.dto';

@Injectable()
export class UserRepository
  extends BaseRepository<User, ResponseUserDbDto>
  implements IUserRepository
{
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ) {
    super(_userModel, 'Usuario');
  }

  transform(entity: User): ResponseUserDbDto {
    return {
      _id: (entity._id as ObjectId).toString(),
      email: entity.email,
      userName: entity.userName,
      password: entity.password,
      isActive: entity.isActive,
      roles: entity.roles,
      isEmailConfirmed: entity.isEmailConfirmed,
      confirmationToken: entity.confirmationToken,
    };
  }
}
