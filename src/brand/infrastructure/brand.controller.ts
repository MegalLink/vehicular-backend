import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { BrandService } from '../application/brand.service';
import { CreateBrandDto } from '../domain/dto/create-brand.dto';
import { CreateBrandModelDto } from '../domain/dto/create-brand-model.dto';
import { CreateModelTypeDto } from '../domain/dto/create-model-type.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/decorators/role-protect.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorBadRequestDto, ErrorNotFoundDto } from '../../common/error.dto';
import { ResponseModelTypeDto } from '../domain/dto/response-model-type.dto';
import { ResponseBrandDto } from '../domain/dto/response-brand.dto';
import { ResponseBrandModelDto } from '../domain/dto/response-brand-model.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({
    status: 201,
    description: 'Create a new brand',
    type: ResponseBrandDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Post('model')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateBrandModelDto })
  @ApiResponse({
    status: 201,
    description: 'Create a new brand model',
    type: ResponseBrandModelDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  createBrandModel(@Body() createDto: CreateBrandModelDto) {
    return this.brandService.createBrandModel(createDto);
  }

  @Post('model/type')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateModelTypeDto })
  @ApiResponse({
    status: 201,
    description: 'Create a new model type',
    type: ResponseModelTypeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  createBrandModelType(@Body() createDto: CreateModelTypeDto) {
    return this.brandService.createBrandType(createDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all brands',
    type: [ResponseBrandDto],
  })
  findAll() {
    return this.brandService.findAllBrands();
  }

  @Get(':brand/model')
  @ApiResponse({
    status: 200,
    description: 'Get all models for a brand',
    type: [ResponseBrandModelDto],
  })
  findAllBrandModels(@Param('brand') brand: string) {
    return this.brandService.findAllBrandModels(brand);
  }

  @Get('model/:model/type')
  @ApiResponse({
    status: 200,
    description: 'Get all types for a model',
    type: [ResponseModelTypeDto],
  })
  findAllModelTypes(@Param('model') model: string) {
    return this.brandService.findAllModelTypes(model);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a brand by ID',
    type: ResponseBrandDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  findOne(@Param('id') id: string) {
    return this.brandService.findOneBrand(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({
    status: 200,
    description: 'Update a brand',
    type: ResponseBrandDto,
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
  updateBrand(@Param('id') id: string, @Body() updateDto: CreateBrandDto) {
    return this.brandService.updateBrand(id, updateDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiResponse({
    status: 200,
    description: 'Remove a brand',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  removeBrand(@Param('id') id: string) {
    return this.brandService.removeBrand(id);
  }

  @Patch('model/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateBrandModelDto })
  @ApiResponse({
    status: 200,
    description: 'Update a brand model',
    type: ResponseBrandModelDto,
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
  updateBrandModel(
    @Param('id') id: string,
    @Body() updateDto: CreateBrandModelDto,
  ) {
    return this.brandService.updateBrandModel(id, updateDto);
  }

  @Delete('model/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiResponse({
    status: 200,
    description: 'Remove a brand model',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  removeBrandModel(@Param('id') id: string) {
    return this.brandService.removeBrandModel(id);
  }

  @Patch('model/type/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateModelTypeDto })
  @ApiResponse({
    status: 200,
    description: 'Update a model type',
    type: ResponseModelTypeDto,
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
  updateModelType(
    @Param('id') id: string,
    @Body() updateDto: CreateModelTypeDto,
  ) {
    return this.brandService.updateModelType(id, updateDto);
  }

  @Delete('model/type/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiResponse({
    status: 200,
    description: 'Remove a model type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  removeModelType(@Param('id') id: string) {
    return this.brandService.removeModelType(id);
  }
}
