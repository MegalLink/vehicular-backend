// Eliminamos la importación directa del módulo order
// import { IOrder } from '../../../order/domain/interfaces/order.interface';

export interface OrderItemDto {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderUserDetailDto {
  firstName: string;
  lastName: string;
  identityDocumentType: string;
  identityDocumentNumber: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface OrderDto {
  orderID: string;
  createdAt: Date;
  userDetail: OrderUserDetailDto;
  items: OrderItemDto[];
  paymentStatus: string;
}

export interface PaymentAdditionalData {
  tax: number;
  paymentWith: string;
  paymentID: string;
}

export interface IPdfRepository {
  generateInvoice(
    order: OrderDto,
    additionalData: PaymentAdditionalData,
  ): Promise<Buffer>;
}
