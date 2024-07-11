import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/decorators/role-protect.decorator';
import { FindOrderQueryDto } from './dto/find-order-query.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(
    @Body() createDto: CreateOrderDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.create(createDto, user);
  }

  @Get()
  @Auth(ValidRoles.user, ValidRoles.manager, ValidRoles.admin)
  findAll(
    @Query() query: FindOrderQueryDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.findAll(query, user);
  }

  @Get(':id')
  @Auth(ValidRoles.user, ValidRoles.manager, ValidRoles.admin)
  findOne(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.orderService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.user, ValidRoles.manager, ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateDTO: UpdateOrderDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.orderService.update(id, updateDTO, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.manager, ValidRoles.admin)
  remove(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.orderService.remove(id, user);
  }
}
