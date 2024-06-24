import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/domain/repository/mongo_base_repository';
import { User } from '../entities/users.entity';
import { ResponseUserDbDto } from '../dto/response-user-db.dto';
import { IUserRepository } from './auth.repository.interface';

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
      _id: entity._id,
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
