import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SparePartService } from '../application/spare_part.service';
import { CreateSparePartDto } from '../domain/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../domain/dto/update_spare_part.dto';

@Controller('spare_part')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.sparePartService.create(createSparePartDto);
  }

  @Get()
  findAll() {
    return this.sparePartService.findAll();
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
