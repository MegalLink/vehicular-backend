import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { isValidObjectId } from 'mongoose';
import { CartRepository } from './repository/cart.repository';
import { ICartRepository } from './repository/cart.respository.interface';
import { ResponseCartDbDto } from './dto/response-cart-db.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(CartRepository)
    private readonly userDetailRepository: ICartRepository,
  ) {}
  async create(
    createDto: CreateCartDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseCartDbDto> {
    const createCart = {
      ...createDto,
      userID: user._id,
    };
    return await this.userDetailRepository.create(createCart);
  }

  async findAll(): Promise<ResponseCartDbDto[]> {
    return await this.userDetailRepository.findAll();
  }

  async findOne(searchParam: string): Promise<ResponseCartDbDto> {
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
    updateCategoryDto: UpdateCartDto,
  ): Promise<ResponseCartDbDto> {
    return await this.userDetailRepository.update(
      searchParam,
      updateCategoryDto,
    );
  }

  async remove(searchParam: string): Promise<ResponseCartDbDto> {
    return await this.userDetailRepository.remove(searchParam);
  }
}
