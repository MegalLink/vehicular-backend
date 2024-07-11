import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { isValidObjectId } from 'mongoose';
import { OrderRepository } from './repository/order.repository';
import { IOrderRepository } from './repository/order.respository.interface';
import { ResponseOrderDbDto } from './dto/response-order-db.dto';
import { CreateOrderDBDto } from './dto/create-order-db.dto';
import { SparePartService } from '../spare_part/application/spare_part.service';
import { v4 as uuidv4 } from 'uuid';
import { ResponseOrderDto } from './dto/response-order.dto';
import { UserDetailService } from '../user-detail/user-detail.service';
import { ResponseUserDetailDbDto } from '../user-detail/dto/response-user-detail-response-db.dto';
import { FindOrderQueryDto } from './dto/find-order-query.dto';
import { ValidRoles } from '../auth/decorators/role-protect.decorator';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: IOrderRepository,
    private readonly sparePartService: SparePartService,
    private readonly userDetailService: UserDetailService,
  ) {}

  async create(
    createDto: CreateOrderDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto> {
    const createOrder = {
      ...createDto,
      userID: user._id,
    };

    const orderItems = [];
    let totalPrice = 0;
    for (const item of createOrder.items) {
      const sparePart = await this.sparePartService.findOne(item.code);
      if (!sparePart) {
        throw new NotFoundException(
          `Repuesto con código ${item.code} no encontrado`,
        );
      }

      if (sparePart.stock < item.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para el repuesto con código ${item.code}`,
        );
      }

      orderItems.push({
        code: item.code,
        name: sparePart.name,
        price: sparePart.price,
        description: sparePart.description,
        quantity: item.quantity,
      });

      totalPrice += sparePart.price * item.quantity;
    }

    for (const item of orderItems) {
      const sparePart = await this.sparePartService.findOne(item.code);
      await this.sparePartService.update(sparePart._id, {
        stock: sparePart.stock - item.quantity,
      });
    }

    const orderID = this._generateOrderID();

    const userDetail: ResponseUserDetailDbDto =
      await this.userDetailService.findOne(createOrder.userDetailID, user);
    if (!userDetail) {
      throw new NotFoundException(
        `Detalles de usuario con id ${createOrder.userDetailID} no encontrados`,
      );
    }
    console.log('User detail', userDetail);

    const newOrder: CreateOrderDBDto = {
      orderID,
      userID: createOrder.userID,
      userDetail: {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        identityDocumentNumber: userDetail.identityDocumentNumber,
        identityDocumentType: userDetail.identityDocumentType,
        address: userDetail.address,
        postalCode: userDetail.postalCode,
        city: userDetail.city,
        province: userDetail.province,
        phone: userDetail.phone,
      },
      totalPrice,
      items: orderItems,
    };

    const createdOrder: ResponseOrderDbDto =
      await this.orderRepository.create(newOrder);

    return this._transformToResponseOrderDto(createdOrder);
  }

  async findAll(
    queryDto: FindOrderQueryDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto[]> {
    if (user.roles.includes(ValidRoles.user) && queryDto.userID) {
      queryDto.userID = user._id;
    }

    const query = this.buildQuery(queryDto, user);
    const orders = await this.orderRepository.findAll(query);
    return orders.map((order) => this._transformToResponseOrderDto(order));
  }

  async findOne(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto> {
    const query: object = isValidObjectId(searchParam)
      ? { _id: searchParam }
      : { orderID: searchParam };
    const response = await this.orderRepository.findOne(query);

    if (!response) {
      throw new NotFoundException(
        `Orden con ${JSON.stringify(query)} no encontrada`,
      );
    }

    this._denyAccessUser(response, user);

    return this._transformToResponseOrderDto(response);
  }

  async update(
    searchParam: string,
    updateDto: UpdateOrderDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto> {
    const order = await this.orderRepository.findOne({ orderID: searchParam });
    if (!order) {
      throw new NotFoundException(`Orden con id ${searchParam} no encontrada`);
    }

    this._denyAccessUser(order, user);

    if (updateDto.status === 'CANCELLED') {
      for (const item of order.items) {
        const sparePart = await this.sparePartService.findOne(item.code);
        await this.sparePartService.update(sparePart._id, {
          stock: sparePart.stock + item.quantity,
        });
      }
    }

    const updatedOrder = await this.orderRepository.update(searchParam, {
      status: updateDto.status,
    });

    return this._transformToResponseOrderDto(updatedOrder);
  }

  async remove(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDbDto> {
    const order = await this.findOne(searchParam, user);

    // Recuperar el stock
    for (const item of order.items) {
      const sparePart = await this.sparePartService.findOne(item.code);
      await this.sparePartService.update(sparePart._id, {
        stock: sparePart.stock + item.quantity,
      });
    }

    return await this.orderRepository.remove(searchParam);
  }

  private _generateOrderID(): string {
    return uuidv4().slice(0, 10);
  }

  private _transformToResponseOrderDto(
    order: ResponseOrderDbDto,
  ): ResponseOrderDto {
    return {
      orderID: order.orderID,
      userID: order.userID,
      userDetail: order.userDetail,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      status: order.status,
      items: order.items.map((item) => ({
        code: item.code,
        name: item.name,
        price: item.price,
        description: item.description,
        quantity: item.quantity,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  private _denyAccessUser(
    orderDB: ResponseOrderDbDto,
    user: ResponseUserDbDto,
  ) {
    if (
      orderDB.userID !== user._id &&
      !user.roles.includes(ValidRoles.admin) &&
      !user.roles.includes(ValidRoles.manager)
    ) {
      throw new BadRequestException('No tienes permiso para ver esta orden');
    }
  }

  private buildQuery(
    filters: FindOrderQueryDto,
    user: ResponseUserDbDto,
  ): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.userID) {
      query.userID = filters.userID;
    }
    if (filters.paymentStatus) {
      query.paymentStatus = filters.paymentStatus;
    }
    if (filters.createdAt) {
      query.createdAt = { $gte: filters.createdAt };
    }

    if (user.roles.includes(ValidRoles.user)) {
      query.userID = user._id;
    }

    return query;
  }
}
