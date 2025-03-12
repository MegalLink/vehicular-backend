import { ResponseUserDbDto } from '../../../auth/application/dto/response-user-db.dto';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { FindOrderQueryDto } from '../../application/dto/find-order-query.dto';
import { ResponseOrderDto } from '../../application/dto/response-order.dto';
import { StripePaymentDto } from '../../application/dto/stripe-payment.dto';
import { IOrder } from '../interfaces/order.interface';

export interface IOrderService {
  create(
    createDto: CreateOrderDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto>;

  findAll(
    queryDto: FindOrderQueryDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto[]>;

  findOne(
    searchParam: string,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto>;

  stripeWebhook(body: Buffer, signature: string): Promise<void>;

  stripePayment(
    paymentInformation: StripePaymentDto,
    user: ResponseUserDbDto,
  ): Promise<any>;
}
