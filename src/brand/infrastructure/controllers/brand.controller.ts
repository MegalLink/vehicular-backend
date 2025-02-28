import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { BrandService } from '../../application/brand.service';
import { CreateBrandDto } from '../../application/dto/create-brand.dto';
import { CreateBrandModelDto } from '../../application/dto/create-brand-model.dto';
import { CreateModelTypeDto } from '../../application/dto/create-model-type.dto';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/decorators/role-protect.decorator';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ErrorBadRequestDto,
  ErrorNotFoundDto,
} from '../../../common/domain/dto/error.dto';
import { ResponseModelTypeDto } from '../../application/dto/response-model-type.dto';
import { ResponseBrandDto } from '../../application/dto/response-brand.dto';
import { ResponseBrandModelDto } from '../../application/dto/response-brand-model.dto';
import { UpdateBrandDto } from '../../application/dto/update-brand.dto';
import { UpdateBrandModelDto } from '../../application/dto/update-brand-model.dto';
import { UpdateModelTypeDto } from '../../application/dto/update-model-type.dto';
import { QueryBrandoModelDto } from '../../application/dto/query-brand-models.dto';
import { QueryBrandoModelTypeDto } from '../../application/dto/query-brand-model-type.dto';

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

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all brands',
    type: [ResponseBrandDto],
  })
  findAllBrands() {
    return this.brandService.findAllBrands();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Brand ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Get a brand by ID',
    type: ResponseBrandDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand not found',
    type: ErrorNotFoundDto,
  })
  findOneBrand(@Param('id') id: string) {
    return this.brandService.findOneBrand(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Brand ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateBrandDto })
  @ApiResponse({
    status: 200,
    description: 'Update a brand',
    type: ResponseBrandDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand not found',
    type: ErrorNotFoundDto,
  })
  updateBrand(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Brand ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete a brand',
    type: ResponseBrandDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand not found',
    type: ErrorNotFoundDto,
  })
  removeBrand(@Param('id') id: string) {
    return this.brandService.removeBrand(id);
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
    status: 404,
    description: 'Brand not found',
    type: ErrorNotFoundDto,
  })
  createBrandModel(@Body() createBrandModelDto: CreateBrandModelDto) {
    return this.brandService.createBrandModel(createBrandModelDto);
  }

  @Get('model/all')
  @ApiQuery({
    name: 'brandId',
    required: false,
    description: 'Filter models by brand ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiQuery({
    name: 'brandName',
    required: false,
    description: 'Filter models by brand name',
    example: 'Ferrari',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all brand models',
    type: [ResponseBrandModelDto],
  })
  findAllBrandModels(@Query() query: QueryBrandoModelDto) {
    return this.brandService.findAllBrandModels(query);
  }

  @Patch('model/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Brand Model ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateBrandModelDto })
  @ApiResponse({
    status: 200,
    description: 'Update a brand model',
    type: ResponseBrandModelDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand model not found',
    type: ErrorNotFoundDto,
  })
  updateBrandModel(
    @Param('id') id: string,
    @Body() updateBrandModelDto: UpdateBrandModelDto,
  ) {
    return this.brandService.updateBrandModel(id, updateBrandModelDto);
  }

  @Delete('model/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Brand Model ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete a brand model',
    type: ResponseBrandModelDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Brand model not found',
    type: ErrorNotFoundDto,
  })
  removeBrandModel(@Param('id') id: string) {
    return this.brandService.removeBrandModel(id);
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
    status: 404,
    description: 'Brand model not found',
    type: ErrorNotFoundDto,
  })
  createModelType(@Body() createModelTypeDto: CreateModelTypeDto) {
    return this.brandService.createBrandType(createModelTypeDto);
  }

  @Get('model/type/all')
  @ApiQuery({
    name: 'modelId',
    required: false,
    description: 'Filter types by model ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiQuery({
    name: 'modelName',
    required: false,
    description: 'Filter types by model name',
    example: 'Lancer',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all model types',
    type: [ResponseModelTypeDto],
  })
  findAllModelTypes(@Query() query: QueryBrandoModelTypeDto) {
    return this.brandService.findAllModelTypes(query);
  }

  @Patch('model/type/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Model Type ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateModelTypeDto })
  @ApiResponse({
    status: 200,
    description: 'Update a model type',
    type: ResponseModelTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Model type not found',
    type: ErrorNotFoundDto,
  })
  updateModelType(
    @Param('id') id: string,
    @Body() updateModelTypeDto: UpdateModelTypeDto,
  ) {
    return this.brandService.updateModelType(id, updateModelTypeDto);
  }

  @Delete('model/type/:id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiParam({
    name: 'id',
    description: 'Model Type ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete a model type',
    type: ResponseModelTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Model type not found',
    type: ErrorNotFoundDto,
  })
  removeModelType(@Param('id') id: string) {
    return this.brandService.removeModelType(id);
  }
}
