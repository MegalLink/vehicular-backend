import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';
import { QueryUserDetailDto } from './dto/query-user-detail.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/decorators/role-protect.decorator';

@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(
    @Body() createUserDetailDto: CreateUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.create(createUserDetailDto, user);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll(
    @Query() query: QueryUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.findAll(query, user);
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  findOne(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.userDetailService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.update(id, updateUserDetailDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.userDetailService.remove(id, user);
  }
}
