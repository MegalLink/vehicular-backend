import { ResponseOrderDbDto } from '../dto/response-order-db.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDBDto } from '../dto/create-order-db.dto';

export interface IOrderRepository {
  create(createDto: CreateOrderDBDto): Promise<ResponseOrderDbDto>;
  findAll(filter?: any): Promise<ResponseOrderDbDto[]>;
  findOne(searchParam: object): Promise<ResponseOrderDbDto | undefined>;
  remove(searchParam: string): Promise<ResponseOrderDbDto>;
  update(
    searchParam: string,
    updateSparePartDto: UpdateOrderDto,
  ): Promise<ResponseOrderDbDto>;
}
