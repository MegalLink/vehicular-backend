import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import { OrderService } from '../../application/order.service';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { GetUser } from '../../../auth/infraestructure/decorators/get-user.decorator';

import { Auth } from '../../../auth/infraestructure/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/infraestructure/decorators/role-protect.decorator';
import { FindOrderQueryDto } from '../../application/dto/find-order-query.dto';
import { StripePaymentDto } from '../../application/dto/stripe-payment.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorBadRequestDto,
  ErrorNotFoundDto,
} from '../../../common/domain/dto/error.dto';
import { ResponseOrderDto } from '../../application/dto/response-order.dto';
import { ResponseUserDbDto } from '../../../auth/application/dto/response-user-db.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth(ValidRoles.user)
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Create order',
    type: ResponseOrderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  create(
    @Body() createDto: CreateOrderDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.create(createDto, user);
  }

  @Get()
  @Auth(ValidRoles.user, ValidRoles.employee, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'Get all orders',
    type: [ResponseOrderDto],
  })
  findAll(
    @Query() query: FindOrderQueryDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.findAll(query, user);
  }

  @Get(':id')
  @Auth(ValidRoles.user, ValidRoles.employee, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'Get order',
    type: ResponseOrderDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  findOne(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.orderService.findOne(id, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.employee, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'Delete order',
    type: ResponseOrderDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  remove(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.orderService.remove(id, user);
  }

  @Post('stripe-payment')
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'Payment with stripe',
    example: {
      url: 'https://stripe.com/restofpaymenturl',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  stripePayment(
    @Body() payment: StripePaymentDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.stripePayment(payment, user);
  }

  @Post('stripe-payment-webhook')
  async stripeWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.orderService.stripeWebhook(body, signature);
  }
}
