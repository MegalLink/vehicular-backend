import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/decorators/role-protect.decorator';
import { FindOrderQueryDto } from './dto/find-order-query.dto';
import { StripePaymentDto } from './dto/stripe-payment.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorBadRequestDto, ErrorNotFoundDto } from '../common/error.dto';
import { ResponseOrderDto } from './dto/response-order.dto';

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

  @Patch(':id')
  @Auth(ValidRoles.user, ValidRoles.employee, ValidRoles.admin)
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: 200,
    description: 'Update order',
    type: ResponseOrderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDTO: UpdateOrderDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.update(id, updateDTO, user);
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
