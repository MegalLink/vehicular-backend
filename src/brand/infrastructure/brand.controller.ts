import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BrandService } from '../application/brand.service';
import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { CreateBrandModelDto } from '../domain/dto/create-brand-model.dto';
import { CreateModelTypeDto } from '../domain/dto/create-model-type.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Post('model')
  createBrandModel(@Body() createDto: CreateBrandModelDto) {
    return this.brandService.createBrandModel(createDto);
  }

  @Post('model/type')
  createBrandModelType(@Body() createDto: CreateModelTypeDto) {
    return this.brandService.createBrandType(createDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAllBrands();
  }

  @Get(':brand/model')
  findAllBrandModels(@Param('brand') brand: string) {
    return this.brandService.findAllBrandModels(brand);
  }

  @Get('model/:model/type')
  findAllModelTypes(@Param('model') model: string) {
    return this.brandService.findAllModelTypes(model);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOneBrand(id);
  }
}
