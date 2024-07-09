import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { isValidObjectId } from 'mongoose';
import { OrderRepository } from './repository/order.repository';
import { IOrderRepository } from './repository/order.respository.interface';
import { ResponseOrderDbDto } from './dto/response-order-db.dto';
import { CreateOrderDBDto } from './dto/create-order-db.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}
  async create(
    createDto: CreateOrderDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDbDto> {
    const createOrder = {
      ...createDto,
      userID: user._id,
    };

    // TODO: con el code obtener consultar el name: { type: String, required: true },
    //         price: { type: String, required: true },
    //         description: { type: String, required: false },
    //         stock: { type: Number, required: true },

    // TODO: calcular el precio total de la orden
    // TODO: actualizar stock segun la cantidad de cada item de la orden
    const orderID = ''; //this._generateOrderID();
    // Setear valores aquí
    const new_order: CreateOrderDBDto = {
      items: [],
      totalPrice: 0,
      userID: '',
      orderID,
      userDetailID: createOrder.userDetailID,
    };

    return await this.orderRepository.create(new_order);
  }

  async findAll(): Promise<ResponseOrderDbDto[]> {
    return await this.orderRepository.findAll();
  }

  async findOne(searchParam: string): Promise<ResponseOrderDbDto> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { orderID: searchParam };
    const response = await this.orderRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(
        `Detall de usuario con ${query} no encontrado`,
      );
    }

    return response;
  }

  async update(
    searchParam: string,
    updateDto: UpdateOrderDto,
  ): Promise<ResponseOrderDbDto> {
    return await this.orderRepository.update(searchParam, updateDto);
  }

  async remove(searchParam: string): Promise<ResponseOrderDbDto> {
    return await this.orderRepository.remove(searchParam);
  }
  private _generateOrderID(): string {
    // const nanoid = customAlphabet('1234567890', 10);
    //return nanoid();
    return '';
  }
}
