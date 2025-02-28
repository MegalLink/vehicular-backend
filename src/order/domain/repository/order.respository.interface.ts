import { IOrder, ICreateOrderDB } from '../interfaces/order.interface';
import { IUpdateOrder } from '../interfaces/update-order.interface';

export interface IOrderRepository {
  create(createOrder: ICreateOrderDB): Promise<IOrder>;
  findAll(filter?: any): Promise<IOrder[]>;
  findOne(searchParam: object): Promise<IOrder | undefined>;
  remove(searchParam: string): Promise<IOrder>;
  update(searchParam: string, updateOrder: IUpdateOrder): Promise<IOrder>;
}
