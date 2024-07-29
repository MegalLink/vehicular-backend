import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UserDetailRepository } from './repository/user-detail.repository';
import { IUserDetailRepository } from './repository/user-detail.respository.interface';
import { isValidObjectId } from 'mongoose';
import { ResponseUserDetailDbDto } from './dto/response-user-detail-response-db.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { QueryUserDetailDto } from './dto/query-user-detail.dto';

export interface IUserDetailService {
  create(
    createDto: CreateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  findAll(
    query: QueryUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto[]>;
  findOne(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  remove(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
}

@Injectable()
export class UserDetailService implements IUserDetailService {
  constructor(
    @Inject(UserDetailRepository)
    private readonly userDetailRepository: IUserDetailRepository,
  ) {}

  async create(
    createDto: CreateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto> {
    console.log('Create User Detail', createDto);
    const createDetail = {
      ...createDto,
      userID: user._id,
    };
    console.log('Create User Detail before', createDetail);
    return await this.userDetailRepository.create(createDetail);
  }

  async findAll(
    query: QueryUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto[]> {
    return await this.userDetailRepository.findAll({
      ...query,
      userID: user._id,
    });
  }

  async findOne(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { userID: searchParam };
    const response = await this.userDetailRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(
        `Detalle de usuario con ${JSON.stringify(query)} no encontrado`,
      );
    }

    if (response.userID !== user._id) {
      throw new ForbiddenException(
        'No tienes permiso para ver este detalle de usuario',
      );
    }

    return response;
  }

  async update(
    searchParam: string,
    updateCategoryDto: UpdateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto> {
    const existingDetail = await this.userDetailRepository.findOne({
      _id: searchParam,
    });

    if (!existingDetail) {
      throw new NotFoundException(
        `Detalle de usuario con id ${searchParam} no encontrado`,
      );
    }

    if (existingDetail.userID !== user._id) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este detalle de usuario',
      );
    }

    return await this.userDetailRepository.update(
      searchParam,
      updateCategoryDto,
    );
  }

  async remove(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto> {
    const existingDetail = await this.userDetailRepository.findOne({
      _id: searchParam,
    });

    if (!existingDetail) {
      throw new NotFoundException(
        `Detalle de usuario con id ${searchParam} no encontrado`,
      );
    }

    if (existingDetail.userID !== user._id) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este detalle de usuario',
      );
    }

    return await this.userDetailRepository.remove(searchParam);
  }
}
