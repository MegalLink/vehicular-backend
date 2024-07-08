import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ResponseUserDbDto } from '../auth/domain/dto/response-user-db.dto';

@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Post()
  create(
    @Body() createUserDetailDto: CreateUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.create(createUserDetailDto, user);
  }

  @Get()
  findAll() {
    return this.userDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return this.userDetailService.update(id, updateUserDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailService.remove(id);
  }
}
