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

@Controller('spare-part')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.sparePartService.create(createSparePartDto);
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
  update(
    @Param('searchParam') searchParam: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return this.sparePartService.update(searchParam, updateSparePartDto);
  }

  @Delete(':searchParam')
  remove(@Param('searchParam') searchParam: string) {
    return this.sparePartService.remove(searchParam);
  }
}
