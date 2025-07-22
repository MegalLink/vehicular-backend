import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseUserDbDto } from '../../auth/application/dto/response-user-db.dto';
import { isValidObjectId } from 'mongoose';
import { IOrderRepository } from '../domain/repository/order.respository.interface';
import { v4 as uuidv4 } from 'uuid';
import { ResponseOrderDto } from './dto/response-order.dto';
import { UserDetailService } from '../../user-detail/application/user-detail.service';
import { ResponseUserDetailDbDto } from '../../user-detail/application/dto/response-user-detail-response-db.dto';
import { FindOrderQueryDto } from './dto/find-order-query.dto';
import { ValidRoles } from '../../auth/infraestructure/decorators/role-protect.decorator';
import { PaymentStatus } from '../domain/constants/order.enum';
import { StripePaymentDto } from './dto/stripe-payment.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from '../../config/env.config';
import Stripe from 'stripe';
import { EmailRepository } from '../../notification/infraestructure/adapters/email.repository';
import { IPdfRepository } from '../../common/domain/interfaces/pdf-repository.interface';
import { FileRepository } from '../../files/infraestructure/adapters/file.repository';
import { PdfRepository } from '../../common/infraestructure/adapters/pdf-repository';
import { SparePartService } from 'src/spare_part/application/spare_part.service';
import { ICreateOrderDB, IOrder } from '../domain/interfaces/order.interface';
import { EmailRepositoryData } from '../../notification/domain/interfaces/email-data.interface';
import { IOrderService } from '../domain/ports/order.service.interface';

@Injectable()
export class OrderService implements IOrderService {
  private _stripe: Stripe;

  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly sparePartService: SparePartService,
    private readonly userDetailService: UserDetailService,
    private readonly _configService: ConfigService,
    private readonly _emailRepository: EmailRepository,
    @Inject(PdfRepository)
    private readonly _pdfRepository: IPdfRepository,
    private readonly _fileRepository: FileRepository,
  ) {
    this._stripe = new Stripe(
      this._configService.get(EnvironmentConstants.stripe_secret_key)!,
      { apiVersion: '2025-05-28.basil' },
    );
  }

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

    const orderID = this._generateOrderID();

    const userDetail: ResponseUserDetailDbDto =
      await this.userDetailService.findOne(createOrder.userDetailID, user);

    if (!userDetail) {
      throw new NotFoundException(
        `Detalles de usuario con id ${createOrder.userDetailID} no encontrados`,
      );
    }

    if (userDetail.userID !== user._id) {
      throw new BadRequestException(
        'No tienes permiso para acceder a estos detallas de usuario',
      );
    }

    const newOrder: ICreateOrderDB = {
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

    const createdOrder: IOrder = await this.orderRepository.create(newOrder);

    return this._transformToResponseOrderDto(createdOrder);
  }

  async findAll(
    queryDto: FindOrderQueryDto,
    user: ResponseUserDbDto,
  ): Promise<ResponseOrderDto[]> {
    if (user.roles.includes(ValidRoles.user)) {
      queryDto.userID = user._id;
    }

    const query = this.buildQuery(queryDto);
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

  async stripeWebhook(body: Buffer, signature: string) {
    const endpointSecret = this._configService.get<string>(
      EnvironmentConstants.stripe_webhook_secret,
    );

    let event: Stripe.Event;

    try {
      event = this._stripe.webhooks.constructEvent(
        body,
        signature,
        endpointSecret!,
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const orderID: string = session.metadata!.orderID!;
          const userEmail: string = session.metadata!.userEmail!;
          const tax: string = session.metadata!.tax!;
          const paymentStatus: string = session.payment_status.toString();
          const paymentID: string | undefined =
            session.payment_intent?.toString();
          const order = await this.orderRepository.findOne({
            orderID: orderID,
          });

          if (!order) {
            console.error('Order not found:', orderID);
            throw new NotFoundException(
              `Orden con id ${orderID} no encontrada`,
            );
          }
          const orderUpdated = await this.orderRepository.update(order._id, {
            paymentStatus: paymentStatus,
            paymentID: paymentID,
          });

          for (const item of order.items) {
            const sparePart = await this.sparePartService.findOne(item.code);
            await this.sparePartService.update(sparePart._id, {
              stock: sparePart.stock - item.quantity,
            });
          }
          const environment = this._configService.get(
            EnvironmentConstants.environment,
          );
          const invoicePDF: Buffer = await this._pdfRepository.generateInvoice(
            orderUpdated,
            { tax: +tax, paymentWith: 'Stripe', paymentID: paymentID! },
          );

          const response = await this._fileRepository.uploadBufferFile(
            invoicePDF,
            `${environment}/pdf`,
          );

          const emailData: EmailRepositoryData = this._sendReceiptEmailData(
            userEmail,
            order.userDetail.firstName,
            response.fileUrl,
          );
          await this._emailRepository.sendEmail(emailData);

          break;
        default:
          return;
      }
    } catch (error) {
      console.error('Error processing webhook event:', error);
      throw new BadRequestException(`Error processing webhook event: ${error}`);
    }
  }

  async stripePayment(
    paymentInformation: StripePaymentDto,
    user: ResponseUserDbDto,
  ) {
    const order: ResponseOrderDto = await this.findOne(
      paymentInformation.orderID,
      user,
    );

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestException('La orden ya ha sido pagada');
    }

    const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;
    // Calculate the total price with tax
    let totalPriceWithTax = 0;

    const lineItems = order.items.map((item) => {
      const priceWithTax = roundToTwoDecimals(
        item.price * paymentInformation.tax + item.price,
      );

      totalPriceWithTax += roundToTwoDecimals(priceWithTax * item.quantity);
      const unit_amount = Math.max(Math.round(priceWithTax * 100), 50); // Ensure a minimum of $0.50 USD

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          // Adjust unit_amount to be in cents (for Stripe)
          unit_amount: unit_amount,
        },
        quantity: item.quantity,
      };
    });

    if (totalPriceWithTax < 0.5) {
      throw new BadRequestException(
        'The order total must be at least $0.50 USD',
      );
    }

    const session = await this._stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      metadata: {
        orderID: order.orderID,
        userEmail: user.email,
        tax: paymentInformation.tax,
      },
      success_url: paymentInformation.successURL,
      cancel_url: paymentInformation.cancelURL,
    });

    return { url: session.url };
  }

  private _generateOrderID(): string {
    return uuidv4().slice(0, 13).replace('-', '');
  }

  private _transformToResponseOrderDto(order: IOrder): ResponseOrderDto {
    return {
      _id: order._id,
      orderID: order.orderID,
      userID: order.userID,
      userDetail: order.userDetail,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      paymentID: order.paymentID,
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

  private _denyAccessUser(orderDB: IOrder, user: ResponseUserDbDto) {
    if (
      orderDB.userID !== user._id &&
      !user.roles.includes(ValidRoles.admin) &&
      !user.roles.includes(ValidRoles.employee)
    ) {
      throw new BadRequestException('No tienes permiso para ver esta orden');
    }
  }

  private buildQuery(filters: FindOrderQueryDto): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.userID) {
      query.userID = filters.userID;
    }
    if (filters.orderID) {
      query.orderID = filters.orderID;
    }
    if (filters.paymentStatus) {
      query.paymentStatus = filters.paymentStatus;
    }
    if (filters.createdAt) {
      query.createdAt = { $gte: filters.createdAt };
    }

    return query;
  }

  private _sendReceiptEmailData(
    email: string,
    username: string,
    receiptURL: string,
  ): EmailRepositoryData {
    return {
      to: [email],
      subject: '¡Tu Recibo de Compra Está Listo!',
      body: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>¡Hola, ${username}!</h2>
        <p>Gracias por tu compra. Nos complace informarte que tu recibo de compra está listo.</p>
        <p>Aquí tienes el enlace para acceder a tu recibo:</p>
        <a href="${receiptURL}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Ver Recibo</a>
        <br>
        <p>Si el enlace no funciona, copia y pega el siguiente enlace en tu navegador:</p>
        <p><a href="${receiptURL}" style="color: #007bff;">${receiptURL}</a></p>
        <br>
        <p>¡Esperamos que disfrutes de tu compra!</p>
        <p>Saludos,<br>El equipo de soporte</p>
      </div>
    `,
    };
  }
}
