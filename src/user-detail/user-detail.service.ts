import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UserDetailRepository } from './repository/user-detail.repository';
import { IUserDetailRepository } from './repository/user-detail.respository.interface';
import { isValidObjectId } from 'mongoose';
import { ResponseUserDetailDbDto } from './dto/response-user-detail-response-db.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';

export interface IUserDetailService {
  create(
    createDto: CreateUserDetailDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseUserDetailDbDto>;
  findAll(): Promise<ResponseUserDetailDbDto[]>;
  findOne(searchParam: string): Promise<ResponseUserDetailDbDto>;
  update(
    searchParam: string,
    updateCategoryDto: UpdateUserDetailDto,
  ): Promise<ResponseUserDetailDbDto>;
  remove(searchParam: string): Promise<ResponseUserDetailDbDto>;
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
    const createDetail = {
      ...createDto,
      userID: user._id,
    };
    return await this.userDetailRepository.create(createDetail);
  }

  async findAll(): Promise<ResponseUserDetailDbDto[]> {
    return await this.userDetailRepository.findAll();
  }

  async findOne(searchParam: string): Promise<ResponseUserDetailDbDto> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { name: searchParam };
    const response = await this.userDetailRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(
        `Detall de usuario con ${query} no encontrado`,
      );
    }

    return response;
  }

  async update(
    searchParam: string,
    updateCategoryDto: UpdateUserDetailDto,
  ): Promise<ResponseUserDetailDbDto> {
    return await this.userDetailRepository.update(
      searchParam,
      updateCategoryDto,
    );
  }

  async remove(searchParam: string): Promise<ResponseUserDetailDbDto> {
    return await this.userDetailRepository.remove(searchParam);
  }
}
