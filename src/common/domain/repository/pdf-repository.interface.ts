import { ResponseOrderDbDto } from '../../../order/dto/response-order-db.dto';

export interface PaymentAdditionalData {
  tax: number;
  paymentWith: string;
}

export interface IPdfRepository {
  generateInvoice(
    order: ResponseOrderDbDto,
    additionalData: PaymentAdditionalData,
  ): Promise<Buffer>;
}
