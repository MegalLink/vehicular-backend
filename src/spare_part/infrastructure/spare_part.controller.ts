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
import { SparePartService } from '../application/spare_part.service';
import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';
import { QuerySparePartDto } from '../domain/dto/query_spare_part.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/decorators/role-protect.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ResponseUserDbDto } from 'src/auth/domain/dto/response-user-db.dto';

@Controller('spare-part')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.manager)
  create(
    @Body() createSparePartDto: CreateSparePartDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.sparePartService.create(createSparePartDto, user);
  }

  @Get()
  async findAll(@Query() queryDto: QuerySparePartDto) {
    return this.sparePartService.findAll(queryDto);
  }

  @Get(':searchParam')
  findOne(@Param('searchParam') searchParam: string) {
    return this.sparePartService.findOne(searchParam);
  }

  @Patch(':searchParam')
  @Auth(ValidRoles.admin, ValidRoles.manager)
  update(
    @Param('searchParam') searchParam: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return this.sparePartService.update(searchParam, updateSparePartDto);
  }

  @Delete(':searchParam')
  @Auth(ValidRoles.admin, ValidRoles.manager)
  remove(@Param('searchParam') searchParam: string) {
    return this.sparePartService.remove(searchParam);
  }
}
