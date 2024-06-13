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

  @Post('model')
  createBrandModelType(@Body() createDto: CreateModelTypeDto) {
    return this.brandService.createBrandType(createDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAllBrands();
  }

  @Get('model/:model')
  findAllBrandModels(@Param('model') model: string) {
    return this.brandService.findAllBrandModels(model);
  }

  @Get('model/type/:modelType')
  findAllModelTypes(@Param('modelType') modelType: string) {
    return this.brandService.findAllModelTypes(modelType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOneBrand(id);
  }
}
